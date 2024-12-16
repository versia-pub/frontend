const art = `

██╗   ██╗███████╗██████╗ ███████╗██╗ █████╗ 
██║   ██║██╔════╝██╔══██╗██╔════╝██║██╔══██╗
██║   ██║█████╗  ██████╔╝███████╗██║███████║
╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║██║██╔══██║
 ╚████╔╝ ███████╗██║  ██║███████║██║██║  ██║
  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═╝

* Hello from the Versia development team!
* If you are seeing this, we may need your help!
* Join development at https://github.com/versia-pub
* 
* With ❤️ from us:
* - @jessew@beta.versia.social
`;

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook("render:response", (ctx) => {
        ctx.body = ctx.body.replace(
            "<!DOCTYPE html>",
            `<!DOCTYPE html>\n<!--${art}-->\n`,
        );
    });
});
