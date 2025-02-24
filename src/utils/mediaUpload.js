import { createClient } from "@supabase/supabase-js";

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwb215cmFrcG5pb2J4cXh3enp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MzUxNjAsImV4cCI6MjA1MTQxMTE2MH0.dWN8q18-5Cs37EBZontRNuEgZPTv05vYqelSlwnvnaw`;

// me ape supabase url eka

const url = "https://qpomyrakpniobxqxwzzx.supabase.co";

const supabase = createClient(url, key);

export default async function uploadMedmiaToSupaBase(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("file not added");
    }

    let fileName = file.name;

    const extention = fileName.split(".").pop();

    const timesatamp = new Date().getTime();

    fileName = timesatamp + file.name + "." + extention;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
          .data.publicUrl;

        resolve(publicUrl);

        console.log(publicUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
