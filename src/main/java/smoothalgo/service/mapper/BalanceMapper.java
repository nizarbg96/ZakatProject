package smoothalgo.service.mapper;


import smoothalgo.domain.*;
import smoothalgo.service.dto.BalanceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Balance} and its DTO {@link BalanceDTO}.
 */
@Mapper(componentModel = "spring", uses = {BankAccountMapper.class, PeriodMapper.class})
public interface BalanceMapper extends EntityMapper<BalanceDTO, Balance> {

    @Mapping(source = "bankAccount.id", target = "bankAccountId")
    @Mapping(source = "period.id", target = "periodId")
    BalanceDTO toDto(Balance balance);

    @Mapping(source = "bankAccountId", target = "bankAccount")
    @Mapping(source = "periodId", target = "period")
    Balance toEntity(BalanceDTO balanceDTO);

    default Balance fromId(Long id) {
        if (id == null) {
            return null;
        }
        Balance balance = new Balance();
        balance.setId(id);
        return balance;
    }
}
