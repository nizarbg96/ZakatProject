package smoothalgo.service.mapper;


import smoothalgo.domain.*;
import smoothalgo.service.dto.BeneficiaryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Beneficiary} and its DTO {@link BeneficiaryDTO}.
 */
@Mapper(componentModel = "spring", uses = {ExtraUserMapper.class})
public interface BeneficiaryMapper extends EntityMapper<BeneficiaryDTO, Beneficiary> {

    @Mapping(source = "extraUser.id", target = "extraUserId")
    BeneficiaryDTO toDto(Beneficiary beneficiary);

    @Mapping(target = "payments", ignore = true)
    @Mapping(target = "removePayments", ignore = true)
    @Mapping(source = "extraUserId", target = "extraUser")
    Beneficiary toEntity(BeneficiaryDTO beneficiaryDTO);

    default Beneficiary fromId(Long id) {
        if (id == null) {
            return null;
        }
        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setId(id);
        return beneficiary;
    }
}
