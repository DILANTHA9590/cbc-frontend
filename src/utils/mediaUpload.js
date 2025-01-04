import { createClient } from "@supabase/supabase-js";

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwb215cmFrcG5pb2J4cXh3enp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MzUxNjAsImV4cCI6MjA1MTQxMTE2MH0.dWN8q18-5Cs37EBZontRNuEgZPTv05vYqelSlwnvnaw`;

// me ape supabase url eka

const url = "https://qpomyrakpniobxqxwzzx.supabase.co";

const supabase = createClient(url, key);

export default async function uploadMedmiaToSupaBase(file) {
  // dan api athanin gaththa evata promise ekk hadagannava methanin
  //promise ekkkata venna puluavn vada dekai sarthaka ho asarthaka
  //ethana type karapu ekama thjama methana promise us ekarla karanne

  return new Promise((resolve, reject) => {
    if (file == null) {
      //dan methana unsuceful vena nisa api reject use karanne
      reject("file not added");
    }

    let fileName = file.name;

    //itapase api meka spli tekamagin . thiyena eva kali valata kadagena avsana extention fileName arrey eke thiyena avsana nama gannava
    //eg oip.jpg [oip,jpg] lenth eka me arrey eke 2 -1 adu unama last eka enava

    const extention = fileName.split(".").pop();

    const timesatamp = new Date().getTime();

    // dan api  me time stamp eken ape image name eke agata me time stamo eka ellla ganavva ethakota e image
    //eka unque venava ethakota aulak venne na

    fileName = timesatamp + file.name + "." + extention;

    //itapasse api superbase ekata upload karanava api methana .thrn use karanava

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        //me uda upload vena vade hariyata unoth api kiyanava pulic url ekk a ganna kiyala\
        //meka api kalin page ekedi baliva eka enne data valata publicurl vala
      })
      .then(() => {
        // api kiyanava superbase eken  ena url eka thiyenne data.publicurl eken ganna kiayala
        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
          .data.publicUrl;
        // meka harigiyoth api eliayata denava public url eka
        resolve(publicUrl);

        //hari giye nathtahm
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// if (file == null) {
//     alert("please select a file");
//     return;
//   }

//   console.log(file);

//   //api methandi ballne file type eka mokda .doc txt vage
//   //vena file extention vaolin ena eva api upload karana denne na
//   //api  iiselama  file name eka veriable ekkeata dagannava
//   let fileName = file.name;

//   //itapase api meka spli tekamagin . thiyena eva kali valata kadagena avsana extention fileName arrey eke thiyena avsana nama gannava
//   //eg oip.jpg [oip,jpg] lenth eka me arrey eke 2 -1 adu unama last eka enava

//   const extention = fileName.split(".").pop();

//   if (extention != "jpg" && extention != "png") {
//     alert("please select a jpg or png file");
//     return;
//   }

//   // methandi api super base kath ekka thiyena connection eka hadaganna oni ekata apata meka ata api url ekai key ekai dagannava
//   //key ekai url ekai oni medeka pass karama  ape supabase ekai frontend ekai athra connection ekak hadenava
//   const supabase = createClient(url, key);

//   const timesatamp = new Date().getTime();

//   // dan api  me time stamp eken ape image name eke agata me time stamo eka ellla ganavva ethakota e image
//   //eka unque venava ethakota aulak venne na

//   fileName = timesatamp + "." + extention;

//   console.log(fileName); //apita vashayanam balanna puluavan update una eka

//   //iata passe ape superbase stoarge ekata  api denava api supabase eke hadagaththa bucket name eka
//   // dan api methanadenna oni file eka save venna oni nama apata eka ganna puluvan uda file eka upload karala
//   //console log ekk gahahuvama apata brower eke file name eka enne file.name e nisa e name eka gannava

//   // e vagema  methandi kiyanne ape browser eke  ena file name eken ape file eken file name eka uplaod venna kiyala denava
//   // //methanin thama ape image eka supa base ekata upload venne
//   //e avagema ekama nemae eken thava ekk upload karanna ba enisa apata pass vena file name eka maru karnahgabnna oni
//   //mokada eka ma name ekk image ekk demmoth methana aul yana nisa api image name eka unique venna hadagagganava
//   //pload karana image eke name eka venas venna api ekata uda time stamop eka gannava mokada me number ekkak aye enne na
//   //ekama value eka ayee enne na
//   await supabase.storage.from("images").upload(fileName, file, {
//     cacheControl: "3600",
//     upsert: false,
//   });
//   //   .then((res) => {
//   //     console.log(res);
//   //   }); //ena file  eka name eka thama nam vidihata save evenna oni //evagema apata mekata .doc.txt vge vena file extention danna denna ba'
//   //api mekata danna denna oni jpg vithrai api eka udin hdagamu

//   //apiata image eka supabase eke save  image eka gannan ni mokda api link ekane db eke save karanne
//   const url2 = supabase.storage.from("image").getPublicUrl(fileName);

//   console.log(url2); //methanin apata ape database eka ekata(supabase) ekata image eka upload karala eken a[ata ena link ekamethaninprint venava]
//   // ape browser eke enava mea url eka

//   // apita dan me file name eka oni(yurl2) mehema nemei ne mehema sarala vidihata aran submit karaganna nemei apaata oni
//   //apata me podi sarakla thanakin submit karanna neme oni apita dan me ka galavagena promise ekk hadaganna oni apita meka aii aii use karanna vena nisa
//   //api meka venama file ekkak hadaganna va src eke util kiyala foler ekk (ape code eke podi podi vada karnne  tghama meka  hadanne)
//   // eke file ekk hadnavamediaupload kiyala api me upload ekata adala tika ekata dagannav dan
// }
