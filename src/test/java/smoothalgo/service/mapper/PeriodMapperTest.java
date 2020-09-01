package smoothalgo.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PeriodMapperTest {

    private PeriodMapper periodMapper;

    @BeforeEach
    public void setUp() {
        periodMapper = new PeriodMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(periodMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(periodMapper.fromId(null)).isNull();
    }
}
