import { ActionI } from './action';

export class AttackAction implements ActionI {
  Action: any = {
    schema_version: "v1",
    name_for_human: "Attack",
    name_for_model: "attack",
    description_for_human: "Initiate an attack on an enemy.",
    description_for_model: "Plugin for initiating an attack on an enemy.",
    auth: {
      type: "none"
    },
    api: {
      type: "airisk",
      url: "/attack"
    },
    logo_url: "/assets/logo.png",
    contact_email: "weolopez@gmail.com",
    legal_info_url: "https://example.com/legal"
  }
}