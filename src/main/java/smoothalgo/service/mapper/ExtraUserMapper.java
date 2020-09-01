package smoothalgo.service.mapper;


import smoothalgo.domain.*;
import smoothalgo.service.dto.ExtraUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ExtraUser} and its DTO {@link ExtraUserDTO}.
 */
@Mapper(componentModel = "spring", uses = {BankAccountMapper.class, UserMapper.class})
public interface ExtraUserMapper extends EntityMapper<ExtraUserDTO, ExtraUser> {

    @Mapping(source = "bankAccount.id", target = "bankAccountId")
    @Mapping(source = "user.id", target = "userId")
    ExtraUserDTO toDto(ExtraUser extraUser);

    @Mapping(source = "bankAccountId", target = "bankAccount")
    @Mapping(source = "userId", target = "user")
    @Mapping(target = "beneficiarys", ignore = true)
    @Mapping(target = "removeBeneficiarys", ignore = true)
    @Mapping(target = "zakats", ignore = true)
    @Mapping(target = "removeZakats", ignore = true)
    @Mapping(target = "periods", ignore = true)
    @Mapping(target = "removePeriods", ignore = true)
    ExtraUser toEntity(ExtraUserDTO extraUserDTO);

    default ExtraUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        ExtraUser extraUser = new ExtraUser();
        extraUser.setId(id);
        return extraUser;
    }
}
