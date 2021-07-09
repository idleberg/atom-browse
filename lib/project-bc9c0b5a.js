"use strict";exports.projectFolders=async function(){const{showFolder:t,warn:e}=await Promise.resolve().then((function(){return require("./util-17fef655.js")})),r=atom.project.getPaths();if(0===r.length)return e("Editor has no projects");r.map((e=>{e.startsWith("atom://")||t({name:"Project Folder",path:e})}))};
//# sourceMappingURL=project-bc9c0b5a.js.map
