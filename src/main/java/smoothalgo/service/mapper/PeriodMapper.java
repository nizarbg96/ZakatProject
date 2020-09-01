package smoothalgo.service.mapper;


import smoothalgo.domain.*;
import smoothalgo.service.dto.PeriodDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Period} and its DTO {@link PeriodDTO}.
 */
@Mapper(componentModel = "spring", uses = {ZakatMapper.class, ExtraUserMapper.class})
public interface PeriodMapper extends EntityMapper<PeriodDTO, Period> {

    @Mapping(source = "zakat.id", target = "zakatId")
    @Mapping(source = "extraUser.id", target = "extraUserId")
    PeriodDTO toDto(Period period);

    @Mapping(source = "zakatId", target = "zakat")
    @Mapping(target = "balances", ignore = true)
    @Mapping(target = "removeBalances", ignore = true)
    @Mapping(source = "extraUserId", target = "extraUser")
    Period toEntity(PeriodDTO periodDTO);

    default Period fromId(Long id) {
        if (id == null) {
            return null;
        }
        Period period = new Period();
        period.setId(id);
        return period;
    }
}
