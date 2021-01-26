import { window, Terminal, Disposable } from 'vscode';
import { getWakeExecCommand, getCwd} from './utils';
import { ExecException, execFile, exec} from 'child_process';

type ExecCallback = (error: ExecException | null, stdout: string, stderr: string) => void;

let wakeRunTerm: Terminal;

export function execWakeInTerminal(args: string[]) {
    const wakeExec = getWakeExecCommand();
    const cmd = wakeExec + ' ' + args.join(' ');

    if (!wakeRunTerm) wakeRunTerm = window.createTerminal('Wonkey');

    wakeRunTerm.show();
    wakeRunTerm.sendText(cmd);
}

export function execWake(args: string[], callback:ExecCallback) {
    const wakeExec = getWakeExecCommand();
    const cwd = getCwd();

    console.log(`Executing ${wakeExec} ${args.join(' ')} on ${cwd}`);

    execFile(wakeExec, args, { cwd }, (err, stdout, stderr) => {
        callback(err, stdout, stderr);
    });
}


export function attachOnCloseTerminalListener(): Disposable {
    return window.onDidCloseTerminal((term) => {
        if (term.name === 'Wonkey') wakeRunTerm = null as any;
    });
}