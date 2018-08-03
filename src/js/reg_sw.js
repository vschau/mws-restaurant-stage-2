export function reg_sw() {
  if (!navigator.serviceWorker) return;
  navigator.serviceWorker.register('./sw.js').then(() => {
    console.log("Registration worked!");
  }).catch(() => {
    console.log("Registration failed!");
  });
}
