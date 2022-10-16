#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]
use std::process::exit;
use std::sync::{Arc, Mutex};
use std::time::Duration;
use tauri::{Manager, State};
use tokio::time::sleep;

#[derive(Default)]
struct Counter(Arc<Mutex<i32>>);

fn main() {
	tauri::Builder::default()
		.manage(Counter::default())
		.invoke_handler(tauri::generate_handler![quit])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}

#[tauri::command]
fn quit() {
	exit(0)
}