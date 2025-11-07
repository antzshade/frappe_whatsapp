// Copyright (c) 2022, Shridhar Patil and contributors
// For license information, please see license.txt

frappe.ui.form.on('WhatsApp Templates', {
	refresh: function(frm) {
		cur_frm.events.create_check_button()
	},

	// ================= End of Hooks =================

	create_check_button: function () { 
		if(cur_frm.is_new()){
		   return
		}
		
		cur_frm.add_custom_button(__("Check Template Status"), function() {
				frappe.call({
			method: "frappe_whatsapp.frappe_whatsapp.doctype.whatsapp_templates.whatsapp_templates.check_wa_template_status",
			args: {
				name: cur_frm.doc.name
			},
			callback: function (r) {
				if (r.message) {
					// frappe.msgprint(r.message);
					cur_frm.reload_doc();
				}
			}
				});
			
		}).css({});
		// Check Template Status
	
	}
	
});
