use std::process::exit;

fn main() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![quit])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}

#[tauri::command]
fn quit() {
	exit(0)
}