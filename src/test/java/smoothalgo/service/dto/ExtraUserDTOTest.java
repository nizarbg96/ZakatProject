package smoothalgo.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import smoothalgo.web.rest.TestUtil;

public class ExtraUserDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExtraUserDTO.class);
        ExtraUserDTO extraUserDTO1 = new ExtraUserDTO();
        extraUserDTO1.setId(1L);
        ExtraUserDTO extraUserDTO2 = new ExtraUserDTO();
        assertThat(extraUserDTO1).isNotEqualTo(extraUserDTO2);
        extraUserDTO2.setId(extraUserDTO1.getId());
        assertThat(extraUserDTO1).isEqualTo(extraUserDTO2);
        extraUserDTO2.setId(2L);
        assertThat(extraUserDTO1).isNotEqualTo(extraUserDTO2);
        extraUserDTO1.setId(null);
        assertThat(extraUserDTO1).isNotEqualTo(extraUserDTO2);
    }
}
