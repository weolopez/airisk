import { Injectable } from '@angular/core';
import { AttackAction } from './attack.action';
import { FavoriteAction } from './favorite.action';
import { FortifyAction } from './fortify.action';

export interface ActionI {
    Action: {
        schema_version: "v1",
        name_for_human: "TODO List (No Auth)",
        name_for_model: "todo",
        description_for_human: "Manage your TODO list. You can add, remove and view your TODOs.",
        description_for_model: "Plugin for managing a TODO list, you can add, remove and view your TODOs.",
        auth: {
            type: "none"
        },
        api: {
            type: "openapi",
            url: "PLUGIN_HOSTNAME/openapi.yaml"
        },
        logo_url: "PLUGIN_HOSTNAME/logo.png",
        contact_email: "support@example.com",
        legal_info_url: "https://example.com/legal"
    }
}

@Injectable({
    providedIn: 'root'
})
export class Actions {
   static action = [new AttackAction(), new FavoriteAction(), new FortifyAction()]
}

