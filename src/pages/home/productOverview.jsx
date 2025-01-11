import { useParams } from "react-router-dom";

export default function ProductOverview() {
  //dan api methana thava hook eka dagannava eka nama useParams
  //eken apata venne ape api request ekath ekka ena parameter gana vistharayak enava
  //api me const param  ekata dala thiyenne param ekk ena json eke vithara tika
  // /;/ketiyenma kiuvoth  useparam valata hambenne adala page eken pass vela apu parameter gana visthrayak thiyena json ekk
  //url eke thiyena parm kiyavaganna puiluvan apata

  // api dan id json eka  g aththa methana enne jsob ekkene eken api id eka vithrak arage daganna oni

  const params = useParams();

  //ilagata pi use effect  hook eka pavichi karanava api meka pavichi karanne ape compoonent eka loard vena velave yam kisi
  // deyak vena oni nam api me hook  ekae us ekaranava

  const productid = params.id;
  console.log(params);

  return (
    <div>
      <h1>Product Over View Page</h1>
    </div>
  );
}
