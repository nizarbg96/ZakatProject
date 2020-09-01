package smoothalgo.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class BalanceMapperTest {

    private BalanceMapper balanceMapper;

    @BeforeEach
    public void setUp() {
        balanceMapper = new BalanceMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(balanceMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(balanceMapper.fromId(null)).isNull();
    }
}
