package smoothalgo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * not an ignored comment
 */
@Entity
@Table(name = "period")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Period implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "begin_date", nullable = false)
    private LocalDate beginDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "duration")
    private Integer duration;

    @NotNull
    @Column(name = "taxable", nullable = false)
    private Boolean taxable;

    @OneToOne
    @JoinColumn(unique = true)
    private Zakat zakat;

    @OneToMany(mappedBy = "period")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Balance> balances = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("periods")
    private ExtraUser extraUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getBeginDate() {
        return beginDate;
    }

    public Period beginDate(LocalDate beginDate) {
        this.beginDate = beginDate;
        return this;
    }

    public void setBeginDate(LocalDate beginDate) {
        this.beginDate = beginDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Period endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getDuration() {
        return duration;
    }

    public Period duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Boolean isTaxable() {
        return taxable;
    }

    public Period taxable(Boolean taxable) {
        this.taxable = taxable;
        return this;
    }

    public void setTaxable(Boolean taxable) {
        this.taxable = taxable;
    }

    public Zakat getZakat() {
        return zakat;
    }

    public Period zakat(Zakat zakat) {
        this.zakat = zakat;
        return this;
    }

    public void setZakat(Zakat zakat) {
        this.zakat = zakat;
    }

    public Set<Balance> getBalances() {
        return balances;
    }

    public Period balances(Set<Balance> balances) {
        this.balances = balances;
        return this;
    }

    public Period addBalances(Balance balance) {
        this.balances.add(balance);
        balance.setPeriod(this);
        return this;
    }

    public Period removeBalances(Balance balance) {
        this.balances.remove(balance);
        balance.setPeriod(null);
        return this;
    }

    public void setBalances(Set<Balance> balances) {
        this.balances = balances;
    }

    public ExtraUser getExtraUser() {
        return extraUser;
    }

    public Period extraUser(ExtraUser extraUser) {
        this.extraUser = extraUser;
        return this;
    }

    public void setExtraUser(ExtraUser extraUser) {
        this.extraUser = extraUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Period)) {
            return false;
        }
        return id != null && id.equals(((Period) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Period{" +
            "id=" + getId() +
            ", beginDate='" + getBeginDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", duration=" + getDuration() +
            ", taxable='" + isTaxable() + "'" +
            "}";
    }
}
