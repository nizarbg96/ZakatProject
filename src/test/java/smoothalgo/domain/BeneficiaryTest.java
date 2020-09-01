package smoothalgo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import smoothalgo.web.rest.TestUtil;

public class BeneficiaryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Beneficiary.class);
        Beneficiary beneficiary1 = new Beneficiary();
        beneficiary1.setId(1L);
        Beneficiary beneficiary2 = new Beneficiary();
        beneficiary2.setId(beneficiary1.getId());
        assertThat(beneficiary1).isEqualTo(beneficiary2);
        beneficiary2.setId(2L);
        assertThat(beneficiary1).isNotEqualTo(beneficiary2);
        beneficiary1.setId(null);
        assertThat(beneficiary1).isNotEqualTo(beneficiary2);
    }
}
