{
  description = "NEH flake";

  inputs = {
    nixpkgs.url = "nixpkgs";
    flake-utils.url = "flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        name = "nodejs-backend";
        pkgs = nixpkgs.legacyPackages.${system};
      in
      with pkgs;
      {
        devShells.default = mkShell
          {
            inherit name;

            nativeBuildInputs = builtins.attrValues {
              inherit (pkgs)
                curl
                jq
                nodejs_20;
            };

            env = {
              PORT = 8080;
              REPOSITORY = "FS";
            };

          };
      }
    );
}
