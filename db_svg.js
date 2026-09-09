function getExerciseDiagramSVG(exName, muscleGroup) {
  if (typeof EXERCISE_DATABASE !== 'undefined') {
    const ex = EXERCISE_DATABASE.find(e => e.name === exName);
    if (ex && ex.gifUrl) {
       return `<div class="media-container w-full h-full flex justify-center items-center bg-[#09090b] p-1 rounded-xl">
          <img src="${ex.gifUrl}" onerror="this.onerror=null; this.src='${ex.imageUrl}'" class="w-full h-full object-contain rounded-lg shadow-inner" style="max-height: 120px;" loading="lazy">
       </div>`;
    }
  }
  return `<div class="media-container w-full h-full flex justify-center items-center bg-black/40 rounded-xl"><span style="color:#666; font-size:10px;">IMG</span></div>`;
}

// ========================================================
// PRO EXERCISE BIOMECHANICS & ANATOMICAL VISUALIZER 4.0 ENGINE
// ========================================================