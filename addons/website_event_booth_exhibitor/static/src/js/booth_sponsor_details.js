/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.boothSponsorDetails = publicWidget.Widget.extend({
    selector: '#o_wbooth_contact_details_form',
    events: {
        'click input[id="contact_details"]': '_onClickContactDetails',
    },

    //--------------------------------------------------------------------------
    // Handler
    //--------------------------------------------------------------------------

    _onClickContactDetails(ev) {
        this.useContactDetails = ev.currentTarget.checked;
        this.$('#o_wbooth_contact_details').toggleClass('d-none', !this.useContactDetails);
        this.$('label[for="sponsor_name"] > .mandatory_mark, label[for="sponsor_email"] > .mandatory_mark').toggleClass('d-none', this.useContactDetails);
        this.$('input[name="contact_name"], input[name="contact_email"]').attr('required', this.useContactDetails);
    },

});

export default {
    boothSponsorDetails: publicWidget.registry.boothSponsorDetails,
};
