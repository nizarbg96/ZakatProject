package smoothalgo.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ExtraUserMapperTest {

    private ExtraUserMapper extraUserMapper;

    @BeforeEach
    public void setUp() {
        extraUserMapper = new ExtraUserMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(extraUserMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(extraUserMapper.fromId(null)).isNull();
    }
}
