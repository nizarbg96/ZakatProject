package smoothalgo.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link smoothalgo.domain.ExtraUser} entity.
 */
public class ExtraUserDTO implements Serializable {

    private Long id;


    private Long bankAccountId;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBankAccountId() {
        return bankAccountId;
    }

    public void setBankAccountId(Long bankAccountId) {
        this.bankAccountId = bankAccountId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ExtraUserDTO extraUserDTO = (ExtraUserDTO) o;
        if (extraUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), extraUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExtraUserDTO{" +
            "id=" + getId() +
            ", bankAccountId=" + getBankAccountId() +
            ", userId=" + getUserId() +
            "}";
    }
}
