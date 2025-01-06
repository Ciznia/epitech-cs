import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
  const serverCommand = "ecsls_run";
  const serverOptions: ServerOptions = {
    command: serverCommand,
    args: [],
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "c" }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("**/.git"),
    },
  };

  client = new LanguageClient(
    "ecsls",
    "ECS Language Server",
    serverOptions,
    clientOptions
  );

  // Start the client
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
