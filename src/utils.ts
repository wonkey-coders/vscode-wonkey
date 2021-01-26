import {
    workspace, WorkspaceConfiguration, WorkspaceFolder,
    window,
    Uri,
    TextDocument,
} from 'vscode';
import { platform } from 'os';
import { execFileSync } from 'child_process';

/**
 * ${WonkeyRootPath}/bin/${host}/wake
 */
const defaultCommand = 'wake';

/** 
 * Get 'wake' executable command.
 * Will get from user setting configuration first.
 * If user don't specify it, then get default command
 */
export function getWakeExecCommand(): string {
    return getWonkeyRootPath()+'/bin/'+getWonkeyHostOS()+'/'+defaultCommand;
}

/** 
 * Get Wonkey root folder.
 * Will get from user setting configuration first.
 * If user don't specify it, then get default command
 */
export function getWonkeyRootPath(): string {
    const config = getWorkspaceConfig();
    const wonkeyPath = config.get('rootPath', '');
    return wonkeyPath;
}

/**
 * Get Wonkey target build.
 */
export function getWonkeyBuildTarget(): string {
    const config = getWorkspaceConfig();
    const buildTarget = config.get('build.target', '');
    return buildTarget;
}

/**
 * Get Wonkey config build.
 */
export function getWonkeyBuildConfig(): string {
    const config = getWorkspaceConfig();
    const buildConfig = config.get('build.config', '');
    return buildConfig;
}

/**
 * Get Wonkey application type.
 */
export function getWonkeyBuildAppType(): string {
    const config = getWorkspaceConfig();
    const buildAppType = config.get('build.apptype', '');
    return buildAppType;
}

/**
 * Get Wonkey host platform.
 */
export function getWonkeyHostOS(): string {
    // Possible values are 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.
    const os = platform();
    const host:any = {
        win32: 'windows',
        linux: 'linux',
        darwin: 'macos',
    };
    return host[os];
}

/**
 * Get Wonkey configuration.
 */
export function getWorkspaceConfig() : WorkspaceConfiguration {
    const currentWorkspaceFolder = getWorkspaceFolder();
    return workspace.getConfiguration('wonkey', currentWorkspaceFolder?.uri);
}

/**
 * Get workspace of current document.
 * @param uri The URI of document
 */
export function getWorkspaceFolder(uri?: Uri): WorkspaceFolder | undefined {
    if (uri) return workspace.getWorkspaceFolder(uri);
    const currentDoc = getCurrentDocument();
    return currentDoc ? workspace.getWorkspaceFolder(currentDoc.uri) : workspace.workspaceFolders[0];
}

/**
 * Get current working directory
 * @param uri The URI of document
 */
export function getCwd(uri?: Uri): string {
    const folder = getWorkspaceFolder(uri || null);
    return folder.uri.fsPath;
}

/**
 * Get current document
 */
export function getCurrentDocument(): TextDocument {
    return window.activeTextEditor ? window.activeTextEditor.document : null;
}

/**
 * Open URL function.
 * @param url The URL to open.
 */
export function openUrl(url: string) {
    const os = platform();
    const open:any = {
        win32: 'start',
        linux: 'xdg-open',
        darwin: 'open',
    };
    execFileSync(open[os], [url]);
}