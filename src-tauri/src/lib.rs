use serde::{ Serialize, Deserialize};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet
        ]) // Register the greet function
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Serialize the reurn value
#[derive(Serialize,Deserialize)]
struct Response<T> {
    ok: bool,
    message: String,
    data: Option<T>,
    redirect_to: Option<String>,
}

// Tauri command handler
#[tauri::command]
fn greet(name: Option<&str>) -> Response<Option<String>> {
    let mut resp = Response {
        ok: false,
        message: "there were something wrong we don't know happnend !".to_string(),
        data: None,
        redirect_to: None,
    };
    
    if let Some(nm) = name {
        if !nm.is_empty() {  // 使用 is_empty() 来判断字符串是否为空
            resp.message = format!("hello {nm}, welcome to the TauriReactTemplate that built by Bertram !");
            resp.ok = true;
        } else {
            resp.message = "your name can't be empty!".to_string();
        }
    }else {
        resp.message = " your name can't be empty !".to_string();
    }
    return resp;
}
