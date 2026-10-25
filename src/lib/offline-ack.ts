/** Used by standalone recovery/404 documents, which do not load the React shell. */
export function renderOfflineAcknowledgement(buildId: string) {
	return `(()=>{const build=${JSON.stringify(buildId)};if(!('serviceWorker' in navigator))return;const acknowledge=()=>navigator.serviceWorker.controller?.postMessage({type:'ELECALCULATE_CLIENT_READY',build});navigator.serviceWorker.addEventListener('message',event=>{if(event.data?.type==='ELECALCULATE_BUILD_REQUEST')acknowledge();});navigator.serviceWorker.addEventListener('controllerchange',acknowledge);window.addEventListener('pageshow',acknowledge);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')acknowledge();});acknowledge();})();`;
}
