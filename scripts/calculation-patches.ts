import { parse } from "@babel/parser";
/** Reviewed fixes live outside immutable historical teaching-source fixtures. */
export function patchCalculationProgram(file: string, program: any) {
	const basic: Record<string, Record<string, string>> = {
		"Elektrotechnik/Gleichstrom.html": { calculateParametersURI: "ohm" },
		"Allgemein/Mathe.html": { calculateKreis: "circle" },
		"Allgemein/Werkstoffe.html": {
			calculateLeitfaehigkeit: "conductor",
			calculateTemperaturwiderstand: "temperature",
			calculateStromdichte: "density",
		},
		"Elektrotechnik/Verstaerkung_Daempfung.html": {
			calculateParameters: "gain",
		},
		"Elektronik/Transistor.html": { calculateTransistorAsSwitch: "transistor" },
		"Elektrotechnik/Wechselstrom.html": {
			calculate_Sinus: "sinus",
			calculate_Rechteck: "rectangle",
			calculate_Dreieck: "triangle",
			calculate_PWM: "pwm",
		},
	};
	const base: Record<string, Record<string, string>> = {
		"Elektrotechnik/Kondensator.html": {
			calculateCapacitorParameters: "capacitor",
		},
		"Elektrotechnik/Spule.html": { calculateInductorParameters: "inductor" },
		"Elektrotechnik/Transformator.html": { calculateParameters: "transformer" },
		"Elektrotechnik/Magnetismus.html": { calculateParameters: "magnetism" },
	};
	const body = (code: string) =>
		(
			parse(`function replacement(){${code}}`, { sourceType: "script" }).program
				.body[0] as any
		).body;
	for (const node of program.body) {
		if (node.type !== "FunctionDeclaration" || !node.id) continue;
		const name = node.id.name;
		if (file === "Elektrotechnik/Wechselstrom.html" && name === "toggleRAD")
			node.body.body.unshift(
				...parse(
					"convertNumericField(document,'phi-Sinus',isRADactive?180/Math.PI:Math.PI/180);",
				).program.body,
			);
		if (file === "Elektrotechnik/Wechselstrom.html" && name === "toggleDuty")
			node.body.body.unshift(
				...parse("convertNumericField(document,'g-PWM',isPercent?.01:100);")
					.program.body,
			);
		if (file === "Elektrotechnik/Kondensator.html" && name === "toggleRAD")
			node.body.body.unshift(
				...parse(
					"convertNumericField(document,'phi_AC',isRADactive_Serie?180/Math.PI:Math.PI/180);",
				).program.body,
			);
		if (file === "Elektrotechnik/Kondensator.html" && name === "toggleRADp")
			node.body.body.unshift(
				...parse(
					"convertNumericField(document,'phi_ACp',isRADactive_Parallel?180/Math.PI:Math.PI/180);",
				).program.body,
			);
		if (
			file === "Elektrotechnik/Wechselstrom.html" &&
			name === "fillExampleValues"
		)
			node.body = body(
				`const examples={euroNet:{Ueff:'230',f:'50',t:'0.022',phi:'0'},functionGen:{up:'5',f:'1k',t:'0.00050',phi:'-45'}};const values=examples[exampleName];if(!values)return;isRADactive=false;document.getElementById('Rad-Button').textContent='360°';for(const key of ['ut','up','upp','Ueff','f','t','T','phi'])document.getElementById(key+'-Sinus').value=values[key]??'';return calculate_Sinus();`,
			);
		if (file === "Elektrotechnik/Gleichstrom.html" && name === "calculate")
			node.body = body("return calculateNetwork(document,opv);");
		const kind = basic[file]?.[name];
		if (kind) {
			let code = `return calculateBasic(document,${JSON.stringify(kind)});`;
			if (kind === "pwm")
				code = "return calculateBasic(document,'pwm',{percent:isPercent});";
			if (kind === "sinus")
				code =
					"const result=calculateBasic(document,'sinus',{radians:isRADactive});const v=result.values;if(!result.errors.length&&Number.isFinite(v.up)&&Number.isFinite(v.f)&&v.f>0)drawSinus(v.up,v.f,v.phi??0,v.t??0,2,8);else {const c=document.getElementById('sinusCanvas');if(c)c.dataset.calculated='false';c?.getContext('2d')?.clearRect(0,0,c.width,c.height);}return result;";
			node.body = body(code);
		}
		if (base[file]?.[name])
			node.body = body(
				`return calculatePassive(document,${JSON.stringify(base[file][name])});`,
			);
		if (file === "Elektrotechnik/Kondensator.html") {
			if (name === "calculateRC")
				node.body = body(
					"return calculatePassiveTransient(document,'RC',drawCurveDynamic);",
				);
			if (name === "calculateSerieAC")
				node.body = body(
					"const result=calculatePassiveCapacitorAC(document,false,isRADactive_Serie);drawPassivePhasors(document,result,false);return result;",
				);
			if (name === "calculateParallelAC")
				node.body = body(
					"const result=calculatePassiveCapacitorAC(document,true,isRADactive_Parallel);drawPassivePhasors(document,result,true);return result;",
				);
			if (
				["drawWiderstandsdreieckSerie", "drawSpannungsdreieckSerie"].includes(
					name,
				)
			)
				node.body = body("return calculateSerieAC();");
			if (
				["drawLeitwertdreieckParallel", "drawStromdreieckParallel"].includes(
					name,
				)
			)
				node.body = body("return calculateParallelAC();");
			if (name === "showExampleSerieTriangle")
				node.body = body(
					"if(Array.from(document.getElementById('Serie').querySelectorAll('input')).some(input=>input.value.trim()))return calculateSerieAC();return drawPassivePhasors(document,{values:{R:4,Xc:3,Z:5,Ur:8,Uc:6,U:10},issues:[]},false,true);",
				);
			if (name === "showExampleParallelTriangle")
				node.body = body(
					"if(Array.from(document.getElementById('Parallel').querySelectorAll('input')).some(input=>input.value.trim()))return calculateParallelAC();return drawPassivePhasors(document,{values:{G:.3,Bc:.4,Y:.5,Ir:3,Ic:4,I:5},issues:[]},true,true);",
				);
		}
		if (file === "Elektrotechnik/Spule.html" && name === "calculateRL")
			node.body = body(
				"return calculatePassiveTransient(document,'RL',drawCurveDynamic);",
			);
		if (
			file === "Elektrotechnik/Schwingkreis.html" &&
			["calculateSerie", "calculateParallel"].includes(name)
		)
			node.body = body(
				`return calculateACResonator(document,${JSON.stringify(name === "calculateSerie" ? "serie" : "parallel")});`,
			);
		if (
			file === "Elektrotechnik/Filter.html" &&
			/^calculate_(?:HP|TP)_(?:RC|RL)$/.test(name)
		)
			node.body = body(
				`return calculateACFilter(document,${JSON.stringify(name.replace("calculate_", ""))});`,
			);
		if (file === "Elektrotechnik/Wechselstrom.html" && name === "drawSinus") {
			const guard = node.body.body.findIndex(
				(statement: any) => statement.type === "IfStatement",
			);
			node.body.body.splice(
				guard + 1,
				0,
				...parse("canvas.dataset.calculated='true';").program.body,
			);
		}
		if (name === "exportCanvasAsPNG")
			node.body = body(
				"const canvas=document.getElementById(canvasId);if(!canvas||(canvasId==='sinusCanvas'&&canvas.dataset.calculated!=='true')||canvas.closest('[data-calculation-stale=true]'))return;const copy=document.createElement('canvas');copy.width=canvas.width;copy.height=canvas.height;const ctx=copy.getContext('2d');ctx.fillStyle='#000';ctx.fillRect(0,0,copy.width,copy.height);ctx.drawImage(canvas,0,0);const a=document.createElement('a');a.download=canvasId+'.png';a.href=copy.toDataURL('image/png');a.click();",
			);

		if (
			file === "Elektrotechnik/Drehstrom_Simulator.html" &&
			name === "drawSumWave"
		)
			node.body = body(
				"ctx.beginPath();ctx.strokeStyle='white';ctx.lineWidth=2;for(let x=0;x<width;x++){const sum=phaseSum((x+time)*frequency,[showRed,showGreen,showBlue],amplitude);const y=centerY+sum;if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.stroke();",
			);
		if (file === "Allgemein/Qubit.html" && name === "onWindowResize")
			node.body.body.push(...parse("scheduleQuantumRender();").program.body);
		if (file === "Allgemein/Qubit.html" && name === "updateStateDisplay")
			node.body.body.push(
				...parse("if(paused)scheduleQuantumRender();").program.body,
			);
		if (file === "Allgemein/Qubit.html" && name === "formatQuantumState") {
			for (const statement of node.body.body) {
				if (statement.type === "VariableDeclaration")
					for (const declaration of statement.declarations) {
						if (
							declaration.id.type === "Identifier" &&
							declaration.id.name === "tol"
						)
							declaration.init = { type: "NumericLiteral", value: 1e-10 };
						if (
							declaration.id.type === "Identifier" &&
							declaration.id.name === "latex" &&
							declaration.init?.type === "StringLiteral"
						)
							declaration.init.value = "|\\psi\\rangle \\approx ";
					}
			}
		}
		if (file === "Allgemein/Qubit.html" && name === "applyGate")
			node.body = body(
				"if(isAnimating)return;const next=quantumGate(qubitState,gateName);animateToState(next.theta,next.phi);",
			);
	}
	// Scope even element-bound listeners so remount/HMR cannot duplicate effects.
}
export function patchSimulationSource(file: string, code: string) {
	if (file === "Elektrotechnik/Wechselstrom.html")
		code = code.replace(
			"const scaleY = (midY - 20) / up;",
			"const scaleY = (midY - 20) / (up === 0 ? 1 : up);",
		);
	if (file === "Allgemein/Qubit.html") {
		code = code.replace(
			"requestAnimationFrame(animate);",
			"animationFrame=requestAnimationFrame(animate);if(scope.isNoteOpen()&&!isAnimating&&!isDragging)return;if(timestamp-lastRender<(isAnimating||isDragging?1000/30:100))return;lastRender=timestamp;",
		);
		code = code.replace(
			"let isAnimating = false;",
			"let isAnimating = false;let stateEpoch=0;let animationFrame=0;let renderFrame=0;let lastRender=-Infinity;let paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;",
		);
		code = code.replace(
			/ANIMATION_DURATION:\s*750/,
			"ANIMATION_DURATION: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 750",
		);
		code = code.replace(
			"function animate() {",
			"function animate(timestamp=performance.now()) { if(paused){scheduleQuantumRender();return;}",
		);
		code = code.replace(
			"function animateToState(targetTheta, targetPhi) {",
			"function animateToState(targetTheta, targetPhi) { const epoch=++stateEpoch;",
		);
		code = code.replaceAll(
			"isAnimating = true;",
			"isAnimating = true;setQuantumBusy(true);",
		);
		code = code.replaceAll(
			"isAnimating = false;",
			"isAnimating = false;setQuantumBusy(false);",
		);
		// Undo the above replacement in the declaration, where renderer/control helpers are not initialized yet.
		code = code.replace(
			"let isAnimating = false;setQuantumBusy(false);",
			"let isAnimating = false;",
		);
		code = code.replace(
			"function animationStep(currentTime) {",
			"function animationStep(currentTime) { if(epoch!==stateEpoch)return;",
		);
		code = code.replace(
			"function updateStateArrow() {",
			"function updateStateArrow() {",
		);
		code = code.replace(
			"function updateStateDisplay() {",
			"function updateStateDisplay() { document.getElementById('theta-slider').value=String(qubitState.theta*180/Math.PI);document.getElementById('phi-slider').value=String((qubitState.phi*180/Math.PI+360)%360);updateSliderDisplay();",
		);
		code += `\nfunction scheduleQuantumRender(){if(renderFrame)return;renderFrame=requestAnimationFrame(()=>{renderFrame=0;renderer.render(scene,camera);});}\nfunction setQuantumBusy(busy){document.querySelectorAll('.gate-btn,.apply-rotation-btn,#theta-slider,#phi-slider').forEach(button=>{button.disabled=busy;button.setAttribute('aria-disabled',String(busy));});document.getElementById('state-display')?.setAttribute('aria-busy',String(busy));}
function toggleAnimation(){paused=!paused;if(paused)cancelAnimationFrame(animationFrame);const button=document.getElementById('animation-toggle');button.textContent=paused?'Animation fortsetzen':'Animation pausieren';button.setAttribute('aria-pressed',String(paused));if(!paused)animate();}
document.addEventListener('DOMContentLoaded',()=>{const host=document.getElementById('bloch-canvas-container');for(const event of ['mousemove','touchmove','wheel'])scope.listen(host,event,()=>{if(paused||scope.isNoteOpen())scheduleQuantumRender();});const button=document.getElementById('animation-toggle');button.textContent=paused?'Animation fortsetzen':'Animation pausieren';button.setAttribute('aria-pressed',String(paused));});`;
	}
	if (file === "Elektrotechnik/Drehstrom_Simulator.html") {
		code = code.replace(
			"let time = 0;",
			"let time=0;let paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let frame=0;",
		);
		code = code.replace("function animate() {", "function animate() {");
		code = code.replace(
			"time += 1;",
			"if(!paused)time=(time+1)%(2*Math.PI/frequency);",
		);
		code = code.replace(
			"requestAnimationFrame(animate);",
			"if(!paused)frame=requestAnimationFrame(animate);",
		);
		code += `\nfunction syncPhaseControls(){for(const color of ['red','green','blue']){const on=color==='red'?showRed:color==='green'?showGreen:showBlue;document.querySelector('.'+color+'-btn')?.setAttribute('aria-pressed',String(on));}const b=document.getElementById('animation-toggle');b.textContent=paused?'Animation fortsetzen':'Animation pausieren';b.setAttribute('aria-pressed',String(paused));}
function toggleAnimation(){paused=!paused;if(paused)cancelAnimationFrame(frame);else animate();syncPhaseControls();}
document.addEventListener('DOMContentLoaded',()=>syncPhaseControls());`;
	}
	return code;
}
export function simulationState(file: string): string {
	if (file === "Allgemein/Qubit.html")
		return `captureState(){return {kind:'qubit',values:{theta:qubitState.theta,phi:qubitState.phi,paused}};},restoreState(snapshot){if(snapshot.kind!=='qubit'||typeof snapshot.values.paused!=='boolean')throw Error('Ungültiger gespeicherter Simulationstyp.');const next={theta:Number(snapshot.values.theta),phi:Number(snapshot.values.phi)};validateQubit(next);++stateEpoch;qubitState=next;isAnimating=false;setQuantumBusy(false);const wasPaused=paused;paused=!!snapshot.values.paused;updateStateArrow();updateStateDisplay();const b=document.getElementById('animation-toggle');b.textContent=paused?'Animation fortsetzen':'Animation pausieren';b.setAttribute('aria-pressed',String(paused));if(wasPaused&&!paused)animate();},`;
	if (file === "Elektrotechnik/Drehstrom_Simulator.html")
		return `captureState(){return{kind:'threephase-simulator',values:{red:showRed,green:showGreen,blue:showBlue,time,paused}};},restoreState(snapshot){if(snapshot.kind!=='threephase-simulator'||!['red','green','blue','paused'].every(key=>typeof snapshot.values[key]==='boolean')||!Number.isFinite(snapshot.values.time)||Number(snapshot.values.time)<0)throw Error('Ungültiger gespeicherter Simulationstyp.');cancelAnimationFrame(frame);showRed=!!snapshot.values.red;showGreen=!!snapshot.values.green;showBlue=!!snapshot.values.blue;time=Number.isFinite(snapshot.values.time)?Number(snapshot.values.time):0;paused=!!snapshot.values.paused;syncPhaseControls();animate();},`;
	if (file === "Elektrotechnik/Wechselstrom.html")
		return `captureState(){return{kind:'waveform-options',values:{radians:isRADactive,percent:isPercent}};},restoreState(snapshot){if(snapshot.kind!=='waveform-options'||!['radians','percent'].every(key=>typeof snapshot.values[key]==='boolean'))throw Error('Ungültige gespeicherte Einheiteneinstellung.');if(typeof snapshot.values.radians==='boolean'){isRADactive=snapshot.values.radians;document.getElementById('Rad-Button').textContent=isRADactive?'2π':'360°';}if(typeof snapshot.values.percent==='boolean'){isPercent=snapshot.values.percent;document.getElementById('Duty-Button').textContent=isPercent?'%':'1';}},`;
	if (file === "Elektrotechnik/Kondensator.html")
		return `captureState(){return{kind:'capacitor-options',values:{seriesRadians:isRADactive_Serie,parallelRadians:isRADactive_Parallel}};},restoreState(snapshot){if(snapshot.kind!=='capacitor-options'||!['seriesRadians','parallelRadians'].every(key=>typeof snapshot.values[key]==='boolean'))throw Error('Ungültige gespeicherte Einheiteneinstellung.');if(typeof snapshot.values.seriesRadians==='boolean'){isRADactive_Serie=snapshot.values.seriesRadians;document.getElementById('Rad-Button').textContent=isRADactive_Serie?'2π':'360°';}if(typeof snapshot.values.parallelRadians==='boolean'){isRADactive_Parallel=snapshot.values.parallelRadians;document.getElementById('Rad-Buttonp').textContent=isRADactive_Parallel?'2π':'360°';}},`;
	return "";
}
