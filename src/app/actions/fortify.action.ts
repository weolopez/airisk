import { ActionI } from './action';

export class FortifyAction implements ActionI {
    Action: any = {
        schema_version: "v1",
        name_for_human: "Fortify",
        name_for_model: "fortify",
        description_for_human: "Fortify you armies.",
        description_for_model: "Plugin for fortifing my armies.",
        auth: {
            type: "none"
        },
        api: {
            type: "fortify",
            url: "/favorite"
        },
        logo_url: "/assets/logo.png",
        contact_email: "support@example.com",
        legal_info_url: "https://example.com/legal"
    }
}