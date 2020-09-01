package smoothalgo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import smoothalgo.web.rest.TestUtil;

public class ExtraUserTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExtraUser.class);
        ExtraUser extraUser1 = new ExtraUser();
        extraUser1.setId(1L);
        ExtraUser extraUser2 = new ExtraUser();
        extraUser2.setId(extraUser1.getId());
        assertThat(extraUser1).isEqualTo(extraUser2);
        extraUser2.setId(2L);
        assertThat(extraUser1).isNotEqualTo(extraUser2);
        extraUser1.setId(null);
        assertThat(extraUser1).isNotEqualTo(extraUser2);
    }
}
