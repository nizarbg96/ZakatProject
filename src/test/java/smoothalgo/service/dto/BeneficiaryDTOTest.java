package smoothalgo.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import smoothalgo.web.rest.TestUtil;

public class BeneficiaryDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BeneficiaryDTO.class);
        BeneficiaryDTO beneficiaryDTO1 = new BeneficiaryDTO();
        beneficiaryDTO1.setId(1L);
        BeneficiaryDTO beneficiaryDTO2 = new BeneficiaryDTO();
        assertThat(beneficiaryDTO1).isNotEqualTo(beneficiaryDTO2);
        beneficiaryDTO2.setId(beneficiaryDTO1.getId());
        assertThat(beneficiaryDTO1).isEqualTo(beneficiaryDTO2);
        beneficiaryDTO2.setId(2L);
        assertThat(beneficiaryDTO1).isNotEqualTo(beneficiaryDTO2);
        beneficiaryDTO1.setId(null);
        assertThat(beneficiaryDTO1).isNotEqualTo(beneficiaryDTO2);
    }
}
