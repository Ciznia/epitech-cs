import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

let clients: LanguageClient[] = [];

export function activate(context: vscode.ExtensionContext) {
  // Configure the ECS Language Server (ecsls)
  const ecslsServerOptions: ServerOptions = {
    command: "ecsls_run", // Command to start the ECS Language Server
    args: [],
  };

  const ecslsClientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "c" }], // Target C files
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("**/.git"),
    },
  };

  const ecslsClient = new LanguageClient(
    "ecsls",
    "ECS Language Server",
    ecslsServerOptions,
    ecslsClientOptions
  );

  // Configure the EHCS Language Server (ehcsls)
  const ehcslsServerOptions: ServerOptions = {
    command: "ehcsls_run", // Command to start the EHCS Language Server
    args: [],
  };

  const ehcslsClientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "hs" }], // Target h files
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("**/.git"),
    },
  };

  const ehcslsClient = new LanguageClient(
    "ehcsls",
    "EHCS Language Server",
    ehcslsServerOptions,
    ehcslsClientOptions
  );

  // Start both clients
  ecslsClient.start();
  ehcslsClient.start();

  // Store clients in the array for later use
  clients.push(ecslsClient, ehcslsClient);
}

export function deactivate(): Thenable<void> | undefined {
  // Stop all clients during deactivation
  return Promise.all(clients.map(client => client.stop())).then(() => undefined);
}
