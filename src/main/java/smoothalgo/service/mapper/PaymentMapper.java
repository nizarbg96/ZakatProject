package smoothalgo.service.mapper;


import smoothalgo.domain.*;
import smoothalgo.service.dto.PaymentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Payment} and its DTO {@link PaymentDTO}.
 */
@Mapper(componentModel = "spring", uses = {ZakatMapper.class, BeneficiaryMapper.class})
public interface PaymentMapper extends EntityMapper<PaymentDTO, Payment> {

    @Mapping(source = "zakat.id", target = "zakatId")
    @Mapping(source = "beneficiary.id", target = "beneficiaryId")
    PaymentDTO toDto(Payment payment);

    @Mapping(source = "zakatId", target = "zakat")
    @Mapping(source = "beneficiaryId", target = "beneficiary")
    Payment toEntity(PaymentDTO paymentDTO);

    default Payment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Payment payment = new Payment();
        payment.setId(id);
        return payment;
    }
}
