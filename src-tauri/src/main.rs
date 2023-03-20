#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]





// use std::error::Error;

// use csv;
// use csv::StringRecord;
// use crate::csv::ErrorKind;
// #[tauri::command]
// fn read_from_file(path: &str) -> Result<(&StringRecord), Box<ErrorKind>> {
//     let mut reader = csv::Reader::from_path(path).expect("Unable to open");
//     let headers = reader.headers();    
//     return headers;
// }

// #[tauri::command]
// fn write_to_file(path:&str) -> Result<(), Box<dyn Error>> {

//     let mut writer = csv::Writer::from_path(path)?;

//     writer.write_record(&["customer_guid", "first_name","last_name", "email", "address"])?;
//     writer.write_record(&["asdf", "ghjkl", "qwerty","ghjkl", "zxcvbnm"])?;
//     writer.write_record(&["asdf1", "ghjkl2", "qwerty3","ghjkl4", "zxcvbnm5"])?;

//     writer.flush()?;

//     Ok(())
// }

// fn main() {
//     if let Err(e) = read_from_file("./src/mockData.csv"){
//         eprintln!("{}", e);
//     }

//     if let Err(e) = write_to_file("./src/mockData.csv"){
//         eprintln!("{}", e);
//     }
// }





fn main() {
            // .invoke_handler(tauri::generate_handler![read_from_file,write_to_file])
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


// use serde_json::Value;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tokio::main]
// #[tauri::command]
// async fn get_subreddit_icon(subredditName: &str) -> Value  {
//     let first_string: &str = "https://www.reddit.com/r/";
//     let second_string: &str = subredditName;
//     let third_string: &str = ".json?sr_detail=1";

    
//     let together = format!("{}{}{}", first_string, second_string,third_string);


//         let resp = reqwest::get(together)
//             .await
//             .unwrap()
//             .json::<serde_json::Value>()
//             .await
//             .unwrap();
//         return resp;
//         // Ok(())
//     }

// // -> String {
// //     format!("Hello, {}! You've been greeted from Rust!", name)
// // }

// #[tokio::main]
// #[tauri::command]
// async fn getposttitle()-> Value  {
//     let resp = reqwest::get("https://www.reddit.com/r/mechmarket/search.json?q=QK65&sort=new")
//         .await
//         .unwrap()
//         .json::<serde_json::Value>()
//         .await
//         .unwrap();
//     return resp;
//     // Ok(())
// }


// #[tokio::main]
// async fn getpostname() -> Result<(), Box<dyn std::error::Error>> {
//     let resp1 = reqwest::get("https://www.reddit.com/r/mechmarket/search.json?q=QK65&sort=new")
//         .await
//         .unwrap()
//         .json::<serde_json::Value>()
//         .await
//         .unwrap();

//         // .await?
//         // .json::<serde_json::Value>()
//         // .await?;
//     // println!("{:#?}", resp1["data"]["children"][0]["data"]["title"]);
//     return resp1;

    // let resp2 = reqwest::get("https://www.reddit.com/r/mechmarket.json?sr_detail=1")
    //     .await?
    //     .json::<serde_json::Value>()
    //     .await?;
    // let imageurl = &resp2["data"]["children"][0]["data"]["sr_detail"]["community_icon"].to_string();
        
    // println!("{:#?}", resp2["data"]["children"][0]["data"]["sr_detail"]["community_icon"]);
    // println!("{:#?}", resp1);
// }



// #![cfg_attr(
//     all(not(debug_assertions), target_os = "windows"),
//     windows_subsystem = "windows"
// )]

// use serde_json::Value;

// // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tokio::main]
// #[tauri::command]
// async fn get_subreddit_icon() -> Value  {
//     let resp = reqwest::get("https://www.reddit.com/r/mechmarket.json?sr_detail=1")
//         .await
//         .unwrap()
//         .json::<serde_json::Value>()
//         .await
//         .unwrap();
//     return resp;
//     // Ok(())
// }


// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![get_subreddit_icon])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

// #[tokio::main]
// #[tauri::command]
// async fn getposttitle()-> Value  {
//     let resp = reqwest::get("https://www.reddit.com/r/mechmarket/search.json?q=QK65&sort=new")
//         .await
//         .unwrap()
//         .json::<serde_json::Value>()
//         .await
//         .unwrap();
//     return resp;
//     // Ok(())
// }


// // #[tokio::main]
// // async fn getpostname() -> Result<(), Box<dyn std::error::Error>> {
// //     let resp1 = reqwest::get("https://www.reddit.com/r/mechmarket/search.json?q=QK65&sort=new")
// //         .await
// //         .unwrap()
// //         .json::<serde_json::Value>()
// //         .await
// //         .unwrap();

// //         // .await?
// //         // .json::<serde_json::Value>()
// //         // .await?;
// //     // println!("{:#?}", resp1["data"]["children"][0]["data"]["title"]);
// //     return resp1;

//     // let resp2 = reqwest::get("https://www.reddit.com/r/mechmarket.json?sr_detail=1")
//     //     .await?
//     //     .json::<serde_json::Value>()
//     //     .await?;
//     // let imageurl = &resp2["data"]["children"][0]["data"]["sr_detail"]["community_icon"].to_string();
        
//     // println!("{:#?}", resp2["data"]["children"][0]["data"]["sr_detail"]["community_icon"]);
//     // println!("{:#?}", resp1);
// // }
