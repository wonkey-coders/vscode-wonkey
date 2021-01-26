import * as vscode from 'vscode';
import * as commands from './commands';

import * as fs from 'fs';
import * as path from 'path';

enum CodeItemKind {
    Undefine,
    Class,
    Interface,
    Enum,
    EnumMember,
    Struct,
    Field,
    Global,
    Const,
    Method_,
    Function,
    Property,
    Param,
    Lambda,
    Local,
    Operator,
    Inner,
    Alias,
    Inherited
}

enum AccessMode {
    Private,
    Protected,
    Public
}

enum DeclFlags {
    Public      = 0x000001,
    Private     = 0x000002,
    Protected   = 0x000004,
    Internal    = 0x000008,

    Virtual     = 0x000100,
    Override    = 0x000200,
    Abstract    = 0x000400,
    Final       = 0x000800,
    Extern      = 0x001000,
    Extension   = 0x002000,
    Default     = 0x004000,

    Getter      = 0x010000,
    Setter      = 0x020000,
    Operator    = 0x040000,
    IFaceMember = 0x080000,
}

/* TODO

class TokensProvider implements vscode.DocumentSemanticTokensProvider, vscode.HoverProvider {

    // Provide document tokens
    async provideDocumentsemanticTokens(doc: vscode.TextDocument, token: vscode.CancellationToken): Promise<vscode.SemanticTokens> {
        return null;
    }

    // Provide hover tooltips
    async provideHover(doc: vscode.TextDocument, pos: vscode.Position, token: vscode.CancellationToken): Promise<vscode.Hover> {
        return null;
    }
}

*/