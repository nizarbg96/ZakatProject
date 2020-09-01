package smoothalgo.service.mapper;


import smoothalgo.domain.*;
import smoothalgo.service.dto.ZakatDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Zakat} and its DTO {@link ZakatDTO}.
 */
@Mapper(componentModel = "spring", uses = {ExtraUserMapper.class})
public interface ZakatMapper extends EntityMapper<ZakatDTO, Zakat> {

    @Mapping(source = "extraUser.id", target = "extraUserId")
    ZakatDTO toDto(Zakat zakat);

    @Mapping(target = "payments", ignore = true)
    @Mapping(target = "removePayments", ignore = true)
    @Mapping(target = "period", ignore = true)
    @Mapping(source = "extraUserId", target = "extraUser")
    Zakat toEntity(ZakatDTO zakatDTO);

    default Zakat fromId(Long id) {
        if (id == null) {
            return null;
        }
        Zakat zakat = new Zakat();
        zakat.setId(id);
        return zakat;
    }
}
