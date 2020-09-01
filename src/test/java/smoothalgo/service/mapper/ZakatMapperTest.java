package smoothalgo.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ZakatMapperTest {

    private ZakatMapper zakatMapper;

    @BeforeEach
    public void setUp() {
        zakatMapper = new ZakatMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(zakatMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(zakatMapper.fromId(null)).isNull();
    }
}
