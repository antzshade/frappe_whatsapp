// Copyright (c) 2022, Shridhar Patil and contributors
// For license information, please see license.txt

frappe.ui.form.on('WhatsApp Message', {
	refresh: function(frm) {
		if (frm.doc.type == 'Incoming'){
			frm.add_custom_button(__("Reply"), function(){
				frappe.new_doc("WhatsApp Message", {"to": frm.doc.from});

			});
		}
		cur_frm.events.add_custom_button_refetch_status(frm)
	},

	add_custom_button_refetch_status: function (frm) {
		cur_frm.add_custom_button(__("Refetch WhatsApp Notification Log"), function () {
			frappe.call({
				method: "frappe_whatsapp.frappe_whatsapp.doctype.whatsapp_message.whatsapp_message.refetch_status_from_whatsapp_notification_log",
				args: {
					id: frm.doc.message_id
				},
				callback: function (r) {
					if (r.message.status) {
						cur_frm.reload_doc()
						frappe.show_alert({
							message: __("Berhasil fetch"),
							indicator: "success",
						}, 10);
					}
					else { 
						frappe.show_alert({
							message: __("Fetch error, please try again or if the error persists, contact your system administrator"),
							indicator: "error",
						}, 10);
					}
				}
			});
			

		});
	}
});
