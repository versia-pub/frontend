{
  description = "Versia Frontend";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";

    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  }:
    {
      overlays.default = final: prev: {
        versia-fe = final.callPackage ./nix/package.nix {};
      };
    }
    // flake-utils.lib.eachSystem ["x86_64-linux" "aarch64-linux"] (system: let
      pkgs = import nixpkgs {
        inherit system;
        overlays = [self.overlays.default];
      };
    in {
      packages = {
        inherit (pkgs) versia-fe;
        default = self.packages.${system}.versia-fe;
      };
    })
    // flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
        overlays = [self.overlays.default];
      };
    in {
      devShells = {
        default = pkgs.mkShell rec {
          libPath = with pkgs;
            lib.makeLibraryPath [
              stdenv.cc.cc.lib
            ];
          LD_LIBRARY_PATH = "${libPath}";
          buildInputs = with pkgs; [
            bun
            nodejs
            vips
            pnpm
            nodePackages.typescript
            nodePackages.typescript-language-server
            nix-ld
          ];
        };
      };
    });
}
