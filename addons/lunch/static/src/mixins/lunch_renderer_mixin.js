/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { useBus, useService } from "@web/core/utils/hooks";

export const LunchRendererMixin = (T) => class LunchRendererMixin extends T {
    setup() {
        super.setup(...arguments);

        this.action = useService("action");
        useBus(this.env.bus, 'lunch_open_order', (ev) => this.openOrderLine(ev.detail.productId));
    }

    openOrderLine(productId, orderId) {
        let context = {};

        if (this.env.searchModel.lunchState.userId) {
            context['default_user_id'] = this.env.searchModel.lunchState.userId;
        }

        let action = {
            res_model: 'lunch.order',
            name: _t('Configure Your Order'),
            type: 'ir.actions.act_window',
            views: [[false, 'form']],
            target: 'new',
            context: {
                ...context,
                default_product_id: productId,
            },
        };

        if (orderId) {
            action['res_id'] = orderId;
        }

        this.action.doAction(action, {
            onClose: () => this.env.bus.trigger('lunch_update_dashboard')
        });
    }
};
