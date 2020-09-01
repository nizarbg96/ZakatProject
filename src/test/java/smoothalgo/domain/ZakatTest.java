package smoothalgo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import smoothalgo.web.rest.TestUtil;

public class ZakatTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Zakat.class);
        Zakat zakat1 = new Zakat();
        zakat1.setId(1L);
        Zakat zakat2 = new Zakat();
        zakat2.setId(zakat1.getId());
        assertThat(zakat1).isEqualTo(zakat2);
        zakat2.setId(2L);
        assertThat(zakat1).isNotEqualTo(zakat2);
        zakat1.setId(null);
        assertThat(zakat1).isNotEqualTo(zakat2);
    }
}
