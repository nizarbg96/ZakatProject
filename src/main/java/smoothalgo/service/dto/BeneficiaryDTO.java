package smoothalgo.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link smoothalgo.domain.Beneficiary} entity.
 */
public class BeneficiaryDTO implements Serializable {

    private Long id;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String adress;

    private String otherDetails;


    private Long extraUserId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getOtherDetails() {
        return otherDetails;
    }

    public void setOtherDetails(String otherDetails) {
        this.otherDetails = otherDetails;
    }

    public Long getExtraUserId() {
        return extraUserId;
    }

    public void setExtraUserId(Long extraUserId) {
        this.extraUserId = extraUserId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BeneficiaryDTO beneficiaryDTO = (BeneficiaryDTO) o;
        if (beneficiaryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), beneficiaryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BeneficiaryDTO{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", adress='" + getAdress() + "'" +
            ", otherDetails='" + getOtherDetails() + "'" +
            ", extraUserId=" + getExtraUserId() +
            "}";
    }
}
