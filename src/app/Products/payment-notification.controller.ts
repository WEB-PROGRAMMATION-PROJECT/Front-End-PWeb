// export class PaymentNotificationController {
//   async handleNotification(req, res) {
//     const {
//       cpm_trans_id,
//       cpm_site_id,
//       cpm_amount,
//       cpm_currency,
//       cpm_payment_date,
//       cpm_payment_time,
//       cpm_error_message,
//       cpm_payid,
//       cpm_payment_config,
//       cpm_version,
//       cpm_result,
//       cpm_trans_status,
//       cpm_phone_prefixe,
//       cpm_phone_num,
//       cpm_telephone,
//       signature
//     } = req.body;
//
//     // Vérifier la signature
//     // Implémenter la logique de vérification de la signature ici
//
//     // Mettre à jour le statut de la commande
//     if (cpm_result === '00') {
//       // Paiement réussi
//       await this.orderService.updateOrder(cpm_trans_id, {
//         status: 'PAID',
//         payment_reference: cpm_payid,
//         payment_method: cpm_payment_config,
//         payment_phone: cpm_telephone
//       });
//
//       return res.status(200).json({
//         message: 'Notification traitée avec succès'
//       });
//     } else {
//       // Paiement échoué
//       await this.orderService.updateOrder(cpm_trans_id, {
//         status: 'PAYMENT_FAILED',
//         payment_error: cpm_error_message
//       });
//
//       return res.status(200).json({
//         message: 'Échec du paiement enregistré'
//       });
//     }
//   }
// }
