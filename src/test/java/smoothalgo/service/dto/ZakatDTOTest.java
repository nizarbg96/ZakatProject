package smoothalgo.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import smoothalgo.web.rest.TestUtil;

public class ZakatDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ZakatDTO.class);
        ZakatDTO zakatDTO1 = new ZakatDTO();
        zakatDTO1.setId(1L);
        ZakatDTO zakatDTO2 = new ZakatDTO();
        assertThat(zakatDTO1).isNotEqualTo(zakatDTO2);
        zakatDTO2.setId(zakatDTO1.getId());
        assertThat(zakatDTO1).isEqualTo(zakatDTO2);
        zakatDTO2.setId(2L);
        assertThat(zakatDTO1).isNotEqualTo(zakatDTO2);
        zakatDTO1.setId(null);
        assertThat(zakatDTO1).isNotEqualTo(zakatDTO2);
    }
}
