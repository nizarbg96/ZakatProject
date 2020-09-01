package smoothalgo.service.dto;

import io.swagger.annotations.ApiModel;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link smoothalgo.domain.Period} entity.
 */
@ApiModel(description = "not an ignored comment")
public class PeriodDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate beginDate;

    private LocalDate endDate;

    private Integer duration;

    @NotNull
    private Boolean taxable;


    private Long zakatId;

    private Long extraUserId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(LocalDate beginDate) {
        this.beginDate = beginDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Boolean isTaxable() {
        return taxable;
    }

    public void setTaxable(Boolean taxable) {
        this.taxable = taxable;
    }

    public Long getZakatId() {
        return zakatId;
    }

    public void setZakatId(Long zakatId) {
        this.zakatId = zakatId;
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

        PeriodDTO periodDTO = (PeriodDTO) o;
        if (periodDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), periodDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PeriodDTO{" +
            "id=" + getId() +
            ", beginDate='" + getBeginDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", duration=" + getDuration() +
            ", taxable='" + isTaxable() + "'" +
            ", zakatId=" + getZakatId() +
            ", extraUserId=" + getExtraUserId() +
            "}";
    }
}
