import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom"; //apata page athara smoothlky yanna meka oni
import uploadMedmiaToSupaBase from "../../utils/mediaUpload";
//ape routes okkoma handle karanna api use karanne react router dom eka\

export default function EditProducttForm() {
  //me use location ekan eken thama ape state json eken ena data tika ganne e ena tika api veriable ekkta dagena  thiyenava
  const location = useLocation();

  const navigate = useNavigate(); //apita mekedi function ekk hamba venava eka api e function eka navigate kiyana ekata gaththa
  //ita passe me navigate eka call karala onima page ekkata yanna pulyuavan

  //methanqadi api location ekata api product json eke product eka gana wisthara product vble keta dagannava
  const product = location.state.product;

  // api image tika daganna ba use state ekata  daggane  , valin separate karala name eken name eka join eken ven karala dagannava ita passe
  // vname keta dala eka dennava ethanata//me vade karanne meka arrey ekk eka arrey ekk
  const altNames = product.altNames.join(",");
  //api methandi balanava product eka nullda kiyala null nam api yavana admin  product page ekata mokda product ekk nathuva meka loard vela vadak na

  // ita passe api thava deyak danaganna oni dan api methandi api
  //  default set karana thiyena value venas karana ekane klaranne upadate eken
  ////e venas karanakota ape id eka venas karanna denna ba mokada product id eken thama api e product eka visthra upadate karanne
  //e nisa api eka venas karanna bari venna e product id filed api product id input filed ekata a pi dagannava disable kiyala
  //ethakota apita eka venas karanna ba

  if (product == null) {
    navigate("/admin/products");
  }

  // /null naththam  api product eka ena data tika denava edit panel eke thiyena ustate vala defaulkt value vidihata
  // /ethakota api e adala eka click karanakota ekata adla value eka methana use state eke default value eka vidihata denava
  const [productId, setProductID] = useState(product.productId);
  const [productName, setProductName] = useState(product.productName);
  const [alterNataiveName, setAlternativeNames] = useState(altNames);
  //const [imageUrl, setImageUrl] = useState("");

  const [imageFiles, setImageFiles] = useState([]); //image oya vidihata thiyenna arinava

  const [price, setPrice] = useState(product.price);
  const [lastPrice, setLastPrice] = useState(product.lastPrice);
  const [stock, setStock] = useState(product.stock);
  const [description, setDescription] = useState(product.description);

  //meken thami api edit karan na enakota thiyena product page eke data aran enne me hook eken json ekk vidihata data
  //product ekata adala va e ena jsion eka api location kiyana vble keta dagannav

  //methanin apata location gana visthara vgema meka athule ena state eka athuole ape product ekataadala data aran ena json ekath me state eke
  //thiyenava
  //apata metahanin  pass wela apu data tika balaganna puluvan api react valin podi podi data aran yanneme vidihata

  // const location = useLocation(); meka udinmA DAGATHTHA
  // api ekatprint karotha pata labemne arrey eka product ekata adalava

  console.log(location);

  async function handleSubmit() {
    const altNames = alterNataiveName.split(","); //"," cooma valin ven karala denna //mekedi api commsa dala type karnava eva ain vela methanin arrtey ekk enava split function eka nisa
    //mokda meva mehema kare nam godk thiyena nisa api
    //onst imgUrls = imageUrl.split(",");//mehema karala hariyanne na apata promises godak us e karanna venava

    // api hadanava methana promise arrey ekk

    const promisearrey = [];

    //  api forloop ekk use karana mokda apita enne image arrey ekk e ekineka ganna oni mokad api multiple image danne

    //api methana product image files update karanne mehami

    // api methanadi

    //api methandi thama ape satate eke ena image url eka pass karaganne methanata

    let imgUrls = product.images;

    //ita passe ape image input filed eke image thiyeda kiyala
    //  ekiyanne image ekk hri thiyenavanam dan thiyena image tika updte vela aluthtika vatenna oni
    if (imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        //dan api me ena aena eka eka files valata adala promise ekk hadaganna api hada pu promise ekata me files value pasds karala
        promisearrey[i] = uploadMedmiaToSupaBase(imageFiles[i]); //dan apita methandi vennea api add karapu photos tika yanava
        //api hadagathth8uu supabase promise ekata eken supasbase ekata api dena image upload vela ethanin dena imagses links tika aran
        //e tika api promisearrey ekata dagannava dan apata ekin eka dapu pics vala links enava
        //  console.log(imageFiles[i]);

        // api it udin dagannava promises arrey ekk mokda apta links enna oni meka terst karanne haduve dan api hadapu promise ekata
        //supabase tiakta image dala ethannin ena link tika thama save karanna yabnne db eke
      }
      // ita passe methandi state en ava url tika replace vepla aluth tika add venava

      imgUrls = await Promise.all(promisearrey);
    }

    // console.log(promisearrey); //apita promise eka para godak run karaganna oninamapata option ekk thiyena promise kkoma ekapara run karaganan
    //ethakota uda thiyena upi upload karana promise arrey ekekn eka para promise tika run vela promise aarrey ekk denava eka karanne mehema

    // imgUrls = await Promise.all(promisearrey); //meken thama apta eka para promises arrey ekkk aepa apara run karaganna
    //meka hari giyoth apta enava image url eka varadunoth ekk avath run no vi navathinava methanadi venne eka para image url tika labenava
    //uda une eka eaka arrey vala ave methandi oklkoma ekama rrey ekka enava

    console.log(imgUrls);

    //ita apsse api  db eke values valin meke thiyena evata usestae values samana karagannava

    // methandi api kalin vagema use sate veriable tika
    const productData = {
      productId: productId,
      productName: productName,
      altNames: altNames,
      images: imgUrls,
      price: price,
      lastPrice: lastPrice,
      stock: stock,
      description: description,

      //dan api axois call karanna kalin api admin token eka methanata ganna oni api eka mulinma res ekk
      // vidihata gaththe login ekedi backend ekana ena response ekn apita dan admintoken eka oni mokda eka nathuva productt
      //  add karanna bari vidihata thama api haduve back end eka
    };

    const token = localStorage.getItem("token"); //local storage eke save karapu token kiyana item eka gaththa dan apata axios call eka ganna
    // puluvan backend ekata
    try {
      // api hadapu back end api route eka saha api backend ekata yavanna hdagaththa product obj ekath denava
      // ita amathara axios eka athule authorizatioion header ekath danna oni

      // dan api edit karana nisa put kiyana eka danna oni avashaya patch daganna puluvan
      const response = await axios.put(
        // ita passe api product id eka methana ella ganna oni e ella ganne
        //satet eke ena eka mokda eka venas karanna ba eka methanata ella gannava
        // ita passe product id ekata adala kotasa update karanava
        import.meta.env.VITE_BACKEND_URL + "/api/products/" + product.productId,
        productData,
        {
          //ita amatharava api danna oni autherizatoion header eka
          headers: {
            Authorization: "Bearer " + token, //api backend eka hadala thiyenenne beheama token eka yavannne
            //meken thamai backend eka adura ganne api admin kiyala api postman eke authorization
            //vala karapu vadema thamai me
          },
        }
      );
      // navigate("/admin/products"); //api product eka add karapu gama apiva redrect venava adminproduct page ekata
      // window.location.href = "/admin/products"; api meka thama kalinuse kare meka use karanne na mokda meken page eka refresh venagaman
      // thama apiva re direct venne  eka nisa api navigate hook eka use karanava ethakota page eka refresh vimakin thorava
      //page athra redirect venna puluvan

      navigate("/admin/products");
      const getRes = response.data.message;

      toast.success(getRes);
    } catch (err) {
      console.log(err);

      toast.error("Fail to add product");
      // window.location.href = "/admin/products";
    }
    //
    //me function eka haduve api submit eka ebuvama  api dapu data tika db ekata save venmna
    //meka tesft karanna thama print kare apata input filed valata data input karala balanna pulu van
    // methanin prnnav a pirint karla nisa
    // console.log({
    //   // dan meke image url tikai altname tikaprint venne thani string ekk vidihata api eka nathi karanna oni
    //ekat api udiin veriable ekk k hadala kkarana hati balamu ekata api spli eka use karanava
    //api ekata
    //   productId,
    //   productName,
    //   alterNataiveName,
    //   imageUrl,
    //   price,
    //   lastPrice,
    //   stock,
    //   description,
    // });
  }
  // const [productImage, setProductImage] = useState(null); // State for file input

  // const handleFileChange = (e) => {
  //   setProductImage(e.target.files[0]); // Store the selected file
  // };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-500">
      <h1 className="mb-6 text-3xl font-bold text-gray-800"></h1>
      <div className="flex flex-col p-10 space-y-4 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Product ID</label>
          <input
            disabled
            type="text"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productId}
            onChange={(e) => setProductID(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Product Name</label>
          <input
            type="text"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">
            Alternative Names
          </label>
          <input
            type="text"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={alterNataiveName}
            onChange={(e) => setAlternativeNames(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Image URL</label>
          <input
            // api dan image url add karanna yanne eva multiple image urls add karanna puluvan vidihata dan
            //api hadaganna oni e nisa api me input eka athulata denna oni multiple kiyana vachane

            type="file"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            // value={imageUrl}//meka ain karagannava meka thermk na dala
            onChange={(e) =>
              //console.log(e.target.files)} //change ekak unama vena deval tika api print karganna apuluvan
              setImageFiles(e.target.files)
            } //api metahnata denava me ena filkes okkoma tika image files vidihata okkoma save venna kiyala
            //api files theruvama e tika pennave methanin list ekk vidihata(arrrey apata file[0],files[1] e vge enne)
            multiple
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Price</label>
          <input
            type="number"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Last Price</label>
          <input
            type="number"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lastPrice}
            onChange={(e) => setLastPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Stock</label>
          <input
            type="number"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Description</label>
          <textarea
            className="w-[300px] h-[100px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Product Image</label>
          <input
            type="file"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleFileChange}
          />
        </div> */}
        <button
          className="w-[300px] bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-300"
          //button eka athule itapasee api denava haddle sumbit function eka submit karanna kiyala
          onClick={handleSubmit}
        >
          {/* apata dan  add product eka click karama yanna oni datatika athulata ekat api udin function ekk hadagannava */}
          Update Product
        </button>
      </div>
    </div>
  );
}
