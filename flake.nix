{
  description = "Stream flake";

  inputs = {
    nixpkgs.url = "nixpkgs";
    flake-utils.url = "flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        name = "stream-lethanix";
        pkgs = nixpkgs.legacyPackages.${system};
      in
      with pkgs;
      {
        devShells.default = mkShell {
          inherit name;

          nativeBuildInputs = builtins.attrValues {
            inherit (pkgs)
              nodejs_20
              watchexec;
          };

        };
      }
    );
}
