import { pathToFileURL } from 'url';
import { window } from 'vscode';
import { execWakeInTerminal, execWake } from './exec';
import { getWonkeyBuildAppType, getWonkeyBuildConfig, getWonkeyBuildTarget, getWonkeyHostOS, openUrl } from './utils';
import * as path from 'path';

/** 
 * Show wake version 
 */
export function version() {
    execWake(['version'], (err, stdout) => {
        if (err) {
            window.showErrorMessage('Unable to get Wake version. Is Wonkey installed correctly?');
            console.error(err);
            return;
        }
        window.showInformationMessage(stdout);
        //console.log(stdout);
    });
   //execWakeInTerminal(['']);
}

/**
 * Check current file
 */
export async function check() {
    const document = window.activeTextEditor?.document;
    await document?.save();
    const filePath = `'${document?.fileName}'`;
    const apptype = getWonkeyBuildAppType();
    const target = getWonkeyBuildTarget();
    const config = getWonkeyBuildConfig();

    execWakeInTerminal(['app', '-semant', '-apptype='+apptype, '-target='+target, '-config='+config, filePath]);
}

/**
 * Build current file
 */
export async function build() {
    const document = window.activeTextEditor?.document;
    await document?.save();
    const filePath = `'${document?.fileName}'`;
    const apptype = getWonkeyBuildAppType();
    const target = getWonkeyBuildTarget();
    const config = getWonkeyBuildConfig();
    const hostos = getWonkeyHostOS();
    const dirPath = path.dirname(document?.fileName ?? '');
    const dirName = path.basename(dirPath);

    execWakeInTerminal([
        'app', 
        '-build', 
        '-apptype='+apptype, 
        '-target='+target, 
        '-config='+config, 
        '-product='+dirPath+path.sep+dirName+'.products'+path.sep+hostos+path.sep+path.basename(document?.fileName ?? '', '.wx')+((hostos) === 'windows' ? '.exe' : ''), 
        filePath
    ]);
}

/**
 * Clean and rebuild current file
 */
export async function rebuild() {
    const document = window.activeTextEditor?.document;
    await document?.save();
    const filePath = `'${document?.fileName}'`;
    const apptype = getWonkeyBuildAppType();
    const target = getWonkeyBuildTarget();
    const config = getWonkeyBuildConfig();
    const hostos = getWonkeyHostOS();
    const dirPath = path.dirname(document?.fileName ?? '');
    const dirName = path.basename(dirPath);

    execWakeInTerminal([
        'app', 
        '-clean',
        '-build', 
        '-apptype='+apptype, 
        '-target='+target, 
        '-config='+config, 
        '-product='+dirPath+path.sep+dirName+'.products'+path.sep+hostos+path.sep+path.basename(document?.fileName ?? '', '.wx')+((hostos) == 'windows' ? '.exe' : ''), 
        filePath
    ]);
}

/**
 * Run current file
 */
export async function run() {
    const document = window.activeTextEditor?.document;
    await document?.save();
    const filePath = `'${document?.fileName}'`;
    const apptype = getWonkeyBuildAppType();
    const target = getWonkeyBuildTarget();
    const config = getWonkeyBuildConfig();
    const hostos = getWonkeyHostOS();
    const dirPath = path.dirname(document?.fileName ?? '');
    const dirName = path.basename(dirPath);

    execWakeInTerminal([
        'app', 
        '-run', 
        '-apptype='+apptype, 
        '-target='+target, 
        '-config='+config, 
        '-product='+dirPath+path.sep+dirName+'.products'+path.sep+hostos+path.sep+path.basename(document?.fileName ?? '', '.wx')+((hostos) == 'windows' ? '.exe' : ''), 
        filePath
    ]);
}

/**
 * Run current file
 */
export async function rerun() {
    const document = window.activeTextEditor?.document;
    await document?.save();
    const filePath = `'${document?.fileName}'`;
    const apptype = getWonkeyBuildAppType();
    const target = getWonkeyBuildTarget();
    const config = getWonkeyBuildConfig();
    const hostos = getWonkeyHostOS();
    const dirPath = path.dirname(document?.fileName ?? '');
    const dirName = path.basename(dirPath);

    execWakeInTerminal([
        'app', 
        '-clean',
        '-run', 
        '-apptype='+apptype, 
        '-target='+target, 
        '-config='+config, 
        '-product='+dirPath+path.sep+dirName+'.products'+path.sep+hostos+path.sep+path.basename(document?.fileName ?? '', '.wx')+((hostos) == 'windows' ? '.exe' : ''), 
        filePath
    ]);
}

/**
 * Generate AST of current file
 */
export async function geninfo() {
    const document = window.activeTextEditor?.document;
    await document?.save();
    const filePath = `'${document?.fileName}'`;

    execWakeInTerminal(['geninfo', '-semant', filePath]);
}