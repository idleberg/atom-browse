"use strict";var e=require("path"),t=require("fs"),n=require("os"),s=require("util"),a=require("electron"),r=require("child_process"),i=require("./index-e7c973a3.js");require("atom");const o=s.promisify(r.spawn);async function l(e){let n;try{n=await t.promises.stat(e)}catch(t){return i.console.warn(`Skipping '${e}' – not found`),!1}return n.isDirectory()}const c=(e="")=>atom.config.get(`browse.${e}`),g=()=>{switch(n.platform()){case"darwin":return"Finder";case"win32":return"Explorer";default:return"file manager"}};function p(e,t=!1){"all"===c("notify")&&atom.notifications.addInfo(`**${i.name}** ${e}`,{dismissable:t,icon:"check"}),i.console.info(`${e}`)}exports.folderExists=l,exports.getConfig=c,exports.getPackagesDirs=()=>atom.packages.getPackageDirPaths().filter((e=>!e.includes("app.asar"))),exports.isDirectory=async function(e){let n;try{n=await t.promises.lstat(e)}catch(e){return i.console.error(e),!1}return n.isDirectory()},exports.isFile=async function(e){let n;try{n=await t.promises.lstat(e)}catch(e){return i.console.error(e),!1}return n.isFile()},exports.showFolder=async function(e){const t="string"==typeof e?e:e.path;if(!t.length||!await l(t))return;const n=c("customFileManager.fullPath");if(n){let s=c("customFileManager.openArgs");if(s.length>0)if(s.includes("%path%")){const e=s.indexOf("%path%");s[e]=s[e].replace("%path%",t)}else s.push(t);else s=[t];"string"!=typeof e&&!e?.silent&&e?.message?.length&&e?.name?.length&&p(e.message?String(e.message):`Opening '${e.name}' in custom file manager`),o(n,s,{})}else{"string"!=typeof e&&!e?.silent&&e?.message?.length&&e?.name?.length&&p(e.message?String(e.message):`Opening '${e.name}' in ${g()}`);try{await a.shell.openPath(t)}catch(e){a.shell.openItem&&a.shell.openItem(t)}}},exports.showInFolder=async function(n){const s="string"==typeof n?n:n.path;if(!s.length||!await async function(e){try{await t.promises.access(e,t.constants.F_OK)}catch(t){return i.console.warn(`Skipping '${e}' – not found`),!1}return!0}(s))return;const r=c("customFileManager.fullPath");if(r){let t=c("customFileManager.revealArgs");if(t.length>0)if(t.includes("%path%")){const e=t.indexOf("%path%");t[e]=t[e].replace("%path%",s)}else t.push(s);else t=[s];"string"!=typeof n&&!n?.silent&&n?.message?.length&&p(n.message?String(n.message):`Revealing \`${e.basename(s)}\` in custom file manager`),o(r,t,{})}else"string"!=typeof n&&!n?.silent&&n?.message?.length&&p(n.message?String(n.message):`Revealing \`${e.basename(s)}\` in ${g()}`),a.shell.showItemInFolder(s)},exports.warn=function(e,t=!1){"none"!==c("notify")&&atom.notifications.addWarning(`**${i.name}** ${e}`,{dismissable:t}),c("beep")&&atom.beep(),i.console.warn(`${e}`)};
//# sourceMappingURL=util-38f40852.js.map