import { ActionI } from './action';

export class FavoriteAction implements ActionI {
    Action: any = {
        schema_version: "v1",
        name_for_human: "Favorite",
        name_for_model: "favorite",
        description_for_human: "Add a post to your favorites.",
        description_for_model: "Plugin for adding a post to your favorites.",
        auth: {
            type: "none"
        },
        api: {
            type: "airisk",
            url: "/favorite"
        },
        logo_url: "/assets/logo.png",
        contact_email: "support@example.com",
        legal_info_url: "https://example.com/legal"
    }
}