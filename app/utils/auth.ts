import { confirmModalService } from "~/components/modals/composable";
import * as m from "~~/paraglide/messages.js";

export const askForInstance = async (): Promise<URL> => {
    const { confirmed, value } = await confirmModalService.confirm({
        title: m.sharp_alive_anteater_fade(),
        inputType: "url",
        message: m.noble_misty_rook_slide(),
    });

    if (confirmed && value) {
        return new URL(URL.canParse(value) ? value : `https://${value}`);
    }

    throw new Error("No instance provided");
};
