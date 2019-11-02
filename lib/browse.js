module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = __webpack_require__(1);
const apm_1 = __importDefault(__webpack_require__(2));
const application_1 = __importDefault(__webpack_require__(9));
const packages_1 = __importDefault(__webpack_require__(17));
const project_1 = __importDefault(__webpack_require__(18));
const config_1 = __importDefault(__webpack_require__(19));
const reveal_1 = __webpack_require__(20);
var config_2 = __webpack_require__(21);
exports.config = config_2.config;
let subscriptions;
function activate() {
    return __awaiter(this, void 0, void 0, function* () {
        subscriptions = new atom_1.CompositeDisposable();
        subscriptions.add(atom.commands.add('atom-workspace', {
            'browse:.apm-folder': () => {
                apm_1.default();
            }
        }));
        subscriptions.add(atom.commands.add('atom-workspace', {
            'browse:application-folder': () => {
                application_1.default();
            }
        }));
        subscriptions.add(atom.commands.add('atom-workspace', {
            'browse:configuration-folder': () => {
                config_1.default();
            }
        }));
        subscriptions.add(atom.commands.add('atom-workspace', {
            'browse:packages-folder': () => {
                packages_1.default();
            }
        }));
        subscriptions.add(atom.commands.add('atom-workspace', {
            'browse:project-folders': () => {
                project_1.default();
            }
        }));
        subscriptions.add(atom.commands.add('atom-workspace', {
            'browse:reveal-open-files': () => {
                reveal_1.revealFiles();
            }
        }));
        subscriptions.add(atom.commands.add('atom-workspace', {
            'browse:reveal-file': () => {
                reveal_1.revealFile();
            }
        }));
    });
}
exports.activate = activate;
function deactivate() {
    subscriptions && subscriptions.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Jyb3dzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUEyQztBQUUzQyx5REFBdUM7QUFDdkMseUVBQStDO0FBQy9DLG1FQUFpRDtBQUNqRCxpRUFBZ0Q7QUFDaEQsK0RBQTZDO0FBQzdDLDhDQUcyQjtBQUUzQixtQ0FBa0M7QUFBekIsMEJBQUEsTUFBTSxDQUFBO0FBRWYsSUFBSSxhQUE4QyxDQUFDO0FBRW5ELFNBQXNCLFFBQVE7O1FBRTVCLGFBQWEsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUM7UUFHMUMsYUFBYSxDQUFDLEdBQUcsQ0FDZixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNsQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7Z0JBQ3pCLGFBQVMsRUFBRSxDQUFDO1lBQ2QsQ0FBQztTQUNGLENBQUMsQ0FDSCxDQUFDO1FBRUYsYUFBYSxDQUFDLEdBQUcsQ0FDZixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNsQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7Z0JBQ2hDLHFCQUFTLEVBQUUsQ0FBQztZQUNkLENBQUM7U0FDRixDQUFDLENBQ0gsQ0FBQztRQUVGLGFBQWEsQ0FBQyxHQUFHLENBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7WUFDbEMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO2dCQUNsQyxnQkFBWSxFQUFFLENBQUM7WUFDakIsQ0FBQztTQUNGLENBQUMsQ0FDSCxDQUFDO1FBRUYsYUFBYSxDQUFDLEdBQUcsQ0FDZixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNsQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7Z0JBQzdCLGtCQUFjLEVBQUUsQ0FBQztZQUNuQixDQUFDO1NBQ0YsQ0FBQyxDQUNILENBQUM7UUFFRixhQUFhLENBQUMsR0FBRyxDQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQ2xDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtnQkFDN0IsaUJBQWMsRUFBRSxDQUFDO1lBQ25CLENBQUM7U0FDRixDQUFDLENBQ0gsQ0FBQztRQUVGLGFBQWEsQ0FBQyxHQUFHLENBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7WUFDbEMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO2dCQUMvQixvQkFBVyxFQUFFLENBQUM7WUFDaEIsQ0FBQztTQUNGLENBQUMsQ0FDSCxDQUFDO1FBRUYsYUFBYSxDQUFDLEdBQUcsQ0FDZixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNsQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7Z0JBQ3pCLG1CQUFVLEVBQUUsQ0FBQztZQUNmLENBQUM7U0FDRixDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FBQTtBQTVERCw0QkE0REM7QUFFRCxTQUFnQixVQUFVO0lBQ3hCLGFBQWEsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDM0MsQ0FBQztBQUZELGdDQUVDIn0=

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("atom");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __webpack_require__(3);
const util_1 = __webpack_require__(4);
const apmFolder = () => {
    const configPath = path_1.dirname(atom.config.getUserConfigPath());
    const apmPath = path_1.resolve(configPath, '.apm');
    util_1.showFolder('.apm Folder', apmPath);
};
exports.default = apmFolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2FwbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUF3QztBQUN4QyxrQ0FBcUM7QUFFckMsTUFBTSxTQUFTLEdBQUcsR0FBUyxFQUFFO0lBQzNCLE1BQU0sVUFBVSxHQUFXLGNBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUNwRSxNQUFNLE9BQU8sR0FBVyxjQUFPLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXBELGlCQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVGLGtCQUFlLFNBQVMsQ0FBQyJ9

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(5);
const path_1 = __webpack_require__(3);
const os_1 = __webpack_require__(6);
const electron_1 = __webpack_require__(7);
const child_process_1 = __webpack_require__(8);
const spawnAsync = util_1.promisify(child_process_1.spawn);
const getConfig = (key = '') => {
    return atom.config.get(`browse.${key}`);
};
exports.getConfig = getConfig;
const getPackagesDirs = () => {
    const packageDirs = atom.packages.getPackageDirPaths();
    return packageDirs.filter((val) => !val.includes('app.asar'));
};
exports.getPackagesDirs = getPackagesDirs;
const getFileManager = () => {
    switch (os_1.platform()) {
        case 'darwin':
            return 'Finder';
        case 'win32':
            return 'Explorer';
        default:
            return 'file manager';
    }
};
const showFolder = (folderName, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileManager = getConfig('customFileManager.fullPath');
    if (fileManager) {
        let openArgs = getConfig('customFileManager.openArgs');
        if (openArgs.length > 0) {
            if (openArgs.includes('%path%')) {
                const index = openArgs.indexOf('%path%');
                openArgs[index] = openArgs[index].replace('%path%', filePath);
            }
            else {
                openArgs.push(filePath);
            }
        }
        else {
            openArgs = [filePath];
        }
        info(`Opening ${folderName} in custom file manager`);
        spawnAsync(fileManager, openArgs, {});
    }
    else {
        info(`Opening ${folderName} in ${getFileManager()}`);
        electron_1.shell.openItem(filePath);
    }
});
exports.showFolder = showFolder;
const showInFolder = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileManager = getConfig('customFileManager.fullPath');
    if (fileManager) {
        let revealArgs = getConfig('customFileManager.revealArgs');
        if (revealArgs.length > 0) {
            if (revealArgs.includes('%path%')) {
                const index = revealArgs.indexOf('%path%');
                revealArgs[index] = revealArgs[index].replace('%path%', filePath);
            }
            else {
                revealArgs.push(filePath);
            }
        }
        else {
            revealArgs = [filePath];
        }
        info(`Revealing \`${path_1.basename(filePath)}\` in custom file manager`);
        spawnAsync(fileManager, revealArgs, {});
    }
    else {
        info(`Revealing \`${path_1.basename(filePath)}\` in ${getFileManager()}`);
        electron_1.shell.showItemInFolder(filePath);
    }
});
exports.showInFolder = showInFolder;
const info = (message, dismissable = false) => {
    if (getConfig('notify')) {
        atom.notifications.addInfo(`**browse**: ${message}`, {
            dismissable: dismissable,
            icon: 'check'
        });
    }
};
const warn = (message, dismissable = false) => {
    if (getConfig('notify')) {
        atom.notifications.addWarning(`**browse**: ${message}`, {
            dismissable: dismissable
        });
    }
    if (getConfig('beep'))
        atom.beep();
};
exports.warn = warn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0JBQWlDO0FBQ2pDLCtCQUFnQztBQUNoQywyQkFBOEI7QUFFOUIsdUNBQWlDO0FBQ2pDLGlEQUFzQztBQUV0QyxNQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLHFCQUFLLENBQUMsQ0FBQztBQUVwQyxNQUFNLFNBQVMsR0FBRyxDQUFDLE1BQWMsRUFBRSxFQUFPLEVBQUU7SUFDMUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDO0FBMkZBLDhCQUFTO0FBekZYLE1BQU0sZUFBZSxHQUFHLEdBQWEsRUFBRTtJQUNyQyxNQUFNLFdBQVcsR0FBYSxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFFakUsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFFLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUUsQ0FBQztBQUMxRSxDQUFDLENBQUM7QUFzRkEsMENBQWU7QUFwRmpCLE1BQU0sY0FBYyxHQUFHLEdBQVcsRUFBRTtJQUNsQyxRQUFRLGFBQVEsRUFBRSxFQUFFO1FBQ2xCLEtBQUssUUFBUTtZQUNYLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLEtBQUssT0FBTztZQUNWLE9BQU8sVUFBVSxDQUFDO1FBQ3BCO1lBQ0UsT0FBTyxjQUFjLENBQUM7S0FDekI7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBRyxDQUFPLFVBQWtCLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO0lBQ2hFLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBRTVELElBQUksV0FBVyxFQUFFO1FBQ2YsSUFBSSxRQUFRLEdBQUcsU0FB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

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __webpack_require__(6);
const path_1 = __webpack_require__(3);
const find_up_1 = __importDefault(__webpack_require__(10));
const util_1 = __webpack_require__(4);
const appFolder = () => __awaiter(void 0, void 0, void 0, function* () {
    const execPath = path_1.dirname(path_1.resolve(process.execPath));
    let appFolder;
    switch (os_1.platform()) {
        case 'darwin':
            const plist = find_up_1.default.sync('Resources', { cwd: execPath, type: 'directory' });
            appFolder = plist ? path_1.dirname(plist) : '';
            break;
        default:
            appFolder = execPath;
    }
    util_1.showFolder('Application Folder', appFolder);
});
exports.default = appFolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvYXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQkFBOEI7QUFDOUIsK0JBQXdDO0FBQ3hDLHNEQUE2QjtBQUM3QixrQ0FBcUM7QUFFckMsTUFBTSxTQUFTLEdBQUcsR0FBd0IsRUFBRTtJQUMxQyxNQUFNLFFBQVEsR0FBRyxjQUFPLENBQUMsY0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3BELElBQUksU0FBUyxDQUFDO0lBRWQsUUFBUSxhQUFRLEVBQUUsRUFBRTtRQUNsQixLQUFLLFFBQVE7WUFDWCxNQUFNLEtBQUssR0FBRyxpQkFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO1lBQzNFLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3hDLE1BQU07UUFDUjtZQUNFLFNBQVMsR0FBRyxRQUFRLENBQUM7S0FDeEI7SUFFRCxpQkFBVSxDQUFDLG9CQUFvQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzlDLENBQUMsQ0FBQSxDQUFDO0FBRUYsa0JBQWUsU0FBUyxDQUFDIn0=

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const path = __webpack_require__(3);
const locatePath = __webpack_require__(11);
const pathExists = __webpack_require__(16);

const stop = Symbol('findUp.stop');

module.exports = async (name, options = {}) => {
	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);
	const paths = [].concat(name);

	const runMatcher = async locateOptions => {
		if (typeof name !== 'function') {
			return locatePath(paths, locateOptions);
		}

		const foundPath = await name(locateOptions.cwd);
		if (typeof foundPath === 'string') {
			return locatePath([foundPath], locateOptions);
		}

		return foundPath;
	};

	// eslint-disable-next-line no-constant-condition
	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const foundPath = await runMatcher({...options, cwd: directory});

		if (foundPath === stop) {
			return;
		}

		if (foundPath) {
			return path.resolve(directory, foundPath);
		}

		if (directory === root) {
			return;
		}

		directory = path.dirname(directory);
	}
};

module.exports.sync = (name, options = {}) => {
	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);
	const paths = [].concat(name);

	const runMatcher = locateOptions => {
		if (typeof name !== 'function') {
			return locatePath.sync(paths, locateOptions);
		}

		const foundPath = name(locateOptions.cwd);
		if (typeof foundPath === 'string') {
			return locatePath.sync([foundPath], locateOptions);
		}

		return foundPath;
	};

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const foundPath = runMatcher({...options, cwd: directory});

		if (foundPath === stop) {
			return;
		}

		if (foundPath) {
			return path.resolve(directory, foundPath);
		}

		if (directory === root) {
			return;
		}

		directory = path.dirname(directory);
	}
};

module.exports.exists = pathExists;

module.exports.sync.exists = pathExists.sync;

module.exports.stop = stop;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const path = __webpack_require__(3);
const fs = __webpack_require__(12);
const {promisify} = __webpack_require__(5);
const pLocate = __webpack_require__(13);

const fsStat = promisify(fs.stat);
const fsLStat = promisify(fs.lstat);

const typeMappings = {
	directory: 'isDirectory',
	file: 'isFile'
};

function checkType({type}) {
	if (type in typeMappings) {
		return;
	}

	throw new Error(`Invalid type specified: ${type}`);
}

const matchType = (type, stat) => type === undefined || stat[typeMappings[type]]();

module.exports = async (paths, options) => {
	options = {
		cwd: process.cwd(),
		type: 'file',
		allowSymlinks: true,
		...options
	};
	checkType(options);
	const statFn = options.allowSymlinks ? fsStat : fsLStat;

	return pLocate(paths, async path_ => {
		try {
			const stat = await statFn(path.resolve(options.cwd, path_));
			return matchType(options.type, stat);
		} catch (_) {
			return false;
		}
	}, options);
};

module.exports.sync = (paths, options) => {
	options = {
		cwd: process.cwd(),
		allowSymlinks: true,
		type: 'file',
		...options
	};
	checkType(options);
	const statFn = options.allowSymlinks ? fs.statSync : fs.lstatSync;

	for (const path_ of paths) {
		try {
			const stat = statFn(path.resolve(options.cwd, path_));

			if (matchType(options.type, stat)) {
				return path_;
			}
		} catch (_) {
		}
	}
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const pLimit = __webpack_require__(14);

class EndError extends Error {
	constructor(value) {
		super();
		this.value = value;
	}
}

// The input can also be a promise, so we await it
const testElement = async (element, tester) => tester(await element);

// The input can also be a promise, so we `Promise.all()` them both
const finder = async element => {
	const values = await Promise.all(element);
	if (values[1] === true) {
		throw new EndError(values[0]);
	}

	return false;
};

const pLocate = async (iterable, tester, options) => {
	options = {
		concurrency: Infinity,
		preserveOrder: true,
		...options
	};

	const limit = pLimit(options.concurrency);

	// Start all the promises concurrently with optional limit
	const items = [...iterable].map(element => [element, limit(testElement, element, tester)]);

	// Check the promises either serially or concurrently
	const checkLimit = pLimit(options.preserveOrder ? 1 : Infinity);

	try {
		await Promise.all(items.map(element => checkLimit(finder, element)));
	} catch (error) {
		if (error instanceof EndError) {
			return error.value;
		}

		throw error;
	}
};

module.exports = pLocate;
// TODO: Remove this for the next major release
module.exports.default = pLocate;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const pTry = __webpack_require__(15);

const pLimit = concurrency => {
	if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
		return Promise.reject(new TypeError('Expected `concurrency` to be a number from 1 and up'));
	}

	const queue = [];
	let activeCount = 0;

	const next = () => {
		activeCount--;

		if (queue.length > 0) {
			queue.shift()();
		}
	};

	const run = (fn, resolve, ...args) => {
		activeCount++;

		const result = pTry(fn, ...args);

		resolve(result);

		result.then(next, next);
	};

	const enqueue = (fn, resolve, ...args) => {
		if (activeCount < concurrency) {
			run(fn, resolve, ...args);
		} else {
			queue.push(run.bind(null, fn, resolve, ...args));
		}
	};

	const generator = (fn, ...args) => new Promise(resolve => enqueue(fn, resolve, ...args));
	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount
		},
		pendingCount: {
			get: () => queue.length
		}
	});

	return generator;
};

module.exports = pLimit;
module.exports.default = pLimit;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const pTry = (fn, ...arguments_) => new Promise(resolve => {
	resolve(fn(...arguments_));
});

module.exports = pTry;
// TODO: remove this in the next major version
module.exports.default = pTry;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const fs = __webpack_require__(12);
const {promisify} = __webpack_require__(5);

const pAccess = promisify(fs.access);

module.exports = async path => {
	try {
		await pAccess(path);
		return true;
	} catch (_) {
		return false;
	}
};

module.exports.sync = path => {
	try {
		fs.accessSync(path);
		return true;
	} catch (_) {
		return false;
	}
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(4);
const util_2 = __webpack_require__(4);
const packagesFolder = () => {
    const packagesDirs = util_1.getPackagesDirs();
    packagesDirs.forEach((packagesDir) => {
        util_2.showFolder('Packages Folder', packagesDir);
    });
};
exports.default = packagesFolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcGFja2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBMEM7QUFDMUMsa0NBQXFDO0FBRXJDLE1BQU0sY0FBYyxHQUFHLEdBQVMsRUFBRTtJQUNoQyxNQUFNLFlBQVksR0FBRyxzQkFBZSxFQUFFLENBQUM7SUFFdkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQW1CLEVBQUUsRUFBRTtRQUUzQyxpQkFBVSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsY0FBYyxDQUFDIn0=

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(4);
const projectFolders = () => __awaiter(void 0, void 0, void 0, function* () {
    const projectPaths = atom.project.getPaths();
    if (projectPaths.length === 0) {
        return util_1.warn('Editor has no projects');
    }
    projectPaths.forEach(projectPath => {
        if (!projectPath.startsWith('atom://')) {
            util_1.showFolder('Project Folder', projectPath);
        }
    });
});
exports.default = projectFolders;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wcm9qZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsa0NBQTJDO0FBRTNDLE1BQU0sY0FBYyxHQUFHLEdBQXdCLEVBQUU7SUFDL0MsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUU3QyxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzdCLE9BQU8sV0FBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7S0FDdkM7SUFFRCxZQUFZLENBQUMsT0FBTyxDQUFFLFdBQVcsQ0FBQyxFQUFFO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RDLGlCQUFVLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDO0FBRUYsa0JBQWUsY0FBYyxDQUFDIn0=

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __webpack_require__(3);
const util_1 = __webpack_require__(4);
const configFolder = () => {
    const configPath = path_1.dirname(atom.config.getUserConfigPath());
    util_1.showFolder('Configuration Folder', configPath);
};
exports.default = configFolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUErQjtBQUMvQixrQ0FBcUM7QUFFckMsTUFBTSxZQUFZLEdBQUcsR0FBUyxFQUFFO0lBQzlCLE1BQU0sVUFBVSxHQUFHLGNBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUU1RCxpQkFBVSxDQUFDLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQztBQUVGLGtCQUFlLFlBQVksQ0FBQyJ9

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(4);
const revealFile = (pane) => __awaiter(void 0, void 0, void 0, function* () {
    const activePane = (pane) ? pane : atom.workspace.getActivePaneItem();
    if (activePane && (activePane.constructor.name === 'TextEditor' || activePane.constructor.name === 'ImageEditor')) {
        const filePath = (activePane.buffer.file) ? activePane.buffer.file.path : false;
        if (filePath) {
            util_1.showInFolder(filePath);
        }
        else {
            util_1.warn('File hasn\'t been saved yet');
        }
    }
    else {
        util_1.warn('Active pane is not an editor');
    }
});
exports.revealFile = revealFile;
const revealFiles = () => {
    const paneItems = atom.workspace.getPaneItems();
    if (paneItems.length) {
        paneItems.forEach(paneItem => {
            revealFile(paneItem);
        });
    }
    else {
        util_1.warn('No active files');
    }
};
exports.revealFiles = revealFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2ZWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3JldmVhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGtDQUE2QztBQUU3QyxNQUFNLFVBQVUsR0FBRyxDQUFPLElBQUssRUFBaUIsRUFBRTtJQUNoRCxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUV0RSxJQUFJLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFlBQVksSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsRUFBRTtRQUNqSCxNQUFNLFFBQVEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRWhGLElBQUksUUFBUSxFQUFFO1lBQ1osbUJBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN4QjthQUFNO1lBQ0wsV0FBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7U0FDckM7S0FDRjtTQUFNO1FBQ0wsV0FBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7S0FDdEM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQWdCQSxnQ0FBVTtBQWRaLE1BQU0sV0FBVyxHQUFHLEdBQVMsRUFBRTtJQUM3QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRWhELElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtRQUNwQixTQUFTLENBQUMsT0FBTyxDQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQzVCLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxXQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztLQUN6QjtBQUVILENBQUMsQ0FBQztBQUlBLGtDQUFXIn0=

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    notify: {
        title: 'Show Notifications',
        description: 'Show info notifications for all actions',
        type: 'boolean',
        default: false,
        order: 1
    },
    beep: {
        title: 'Beep on error',
        description: 'Show info notifications for all actions',
        type: 'boolean',
        default: true,
        order: 2
    },
    customFileManager: {
        title: 'Custom File Manager Options',
        type: 'object',
        order: 3,
        properties: {
            fullPath: {
                title: 'Full Path',
                description: 'Specify the full path to a custom file manager',
                type: 'string',
                default: '',
                order: 1
            },
            openArgs: {
                title: 'Open Arguments',
                description: 'Specify custom arguments to open a folder. The use of a `%path%` placeholder is optional.',
                type: 'array',
                default: [],
                items: {
                    type: [
                        'string',
                        'integer'
                    ]
                },
                order: 2
            },
            revealArgs: {
                title: 'Reveal Arguments',
                description: 'Specify custom arguments to reveal a file. The use of a `%path%` placeholder is optional.',
                type: 'array',
                default: [],
                items: {
                    type: [
                        'string',
                        'integer'
                    ]
                },
                order: 3
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxvQkFBb0I7UUFDM0IsV0FBVyxFQUFFLHlDQUF5QztRQUN0RCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxlQUFlO1FBQ3RCLFdBQVcsRUFBRSx5Q0FBeUM7UUFDdEQsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxpQkFBaUIsRUFBRTtRQUNqQixLQUFLLEVBQUUsNkJBQTZCO1FBQ3BDLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLENBQUM7UUFDUixVQUFVLEVBQUU7WUFDVixRQUFRLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2dCQUNYLEtBQUssRUFBRSxDQUFDO2FBQ1Q7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLGdCQUFnQjtnQkFDdkIsV0FBVyxFQUFFLDJGQUEyRjtnQkFDeEcsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRTt3QkFDSixRQUFRO3dCQUNSLFNBQVM7cUJBQ1Y7aUJBQ0Y7Z0JBQ0QsS0FBSyxFQUFFLENBQUM7YUFDVDtZQUNELFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsa0JBQWtCO2dCQUN6QixXQUFXLEVBQUUsMkZBQTJGO2dCQUN4RyxJQUFJLEVBQUUsT0FBTztnQkFDYixPQUFPLEVBQUUsRUFBRTtnQkFDWCxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFO3dCQUNKLFFBQVE7d0JBQ1IsU0FBUztxQkFDVjtpQkFDRjtnQkFDRCxLQUFLLEVBQUUsQ0FBQzthQUNUO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==

/***/ })
/******/ ]);
//# sourceMappingURL=browse.js.map